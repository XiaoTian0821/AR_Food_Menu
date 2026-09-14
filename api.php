<?php
/**
 * AR Food Menu - Compile/Prepare Page
 * Handles image upload and marker management
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$baseDir = dirname(__DIR__);
$menuDir = $baseDir . '/assets/images';
$targetsDir = $baseDir . '/assets/targets';
$layoutFile = $targetsDir . '/layout.json';

// Ensure directories exist
@mkdir($menuDir, 0777, true);
@mkdir($targetsDir, 0777, true);

// Load existing layout
$layout = null;
if (file_exists($layoutFile)) {
    $layout = json_decode(file_get_contents($layoutFile), true);
}

if (!$layout) {
    $layout = [
        'version' => 1,
        'imageWidth' => 800,
        'imageHeight' => 1200,
        'dishes' => []
    ];
}

// Handle requests
$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'upload':
        handleUpload($_FILES['menu_image'] ?? null);
        break;
        
    case 'get':
        echo json_encode($layout);
        break;
        
    case 'save':
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data) {
            file_put_contents($layoutFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid data']);
        }
        break;
        
    case 'markers':
        echo json_encode($layout['dishes'] ?? []);
        break;
        
    case 'auto-detect':
        handleAutoDetect($layout);
        break;
        
    default:
        // Return menu image info
        $menuImage = $menuDir . '/menu.jpg';
        $exists = file_exists($menuImage);
        $size = $exists ? filesize($menuImage) : 0;
        echo json_encode([
            'menu_exists' => $exists,
            'menu_size' => $size,
            'width' => $layout['imageWidth'],
            'height' => $layout['imageHeight'],
            'markers' => $layout['dishes'] ?? []
        ]);
        break;
}

function handleUpload($file) {
    global $menuDir;
    
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $maxSize = 8 * 1024 * 1024; // 8MB
    
    if (!$file) {
        echo json_encode(['success' => false, 'error' => 'No file uploaded']);
        return;
    }
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'error' => 'Upload error: ' . $file['error']]);
        return;
    }
    
    if ($file['size'] > $maxSize) {
        echo json_encode(['success' => false, 'error' => 'File too large (max 8MB)']);
        return;
    }
    
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mime, $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Invalid file type']);
        return;
    }
    
    $target = $menuDir . '/menu.jpg';
    
    // Convert to JPG if needed
    if ($mime === 'image/png' || $mime === 'image/gif' || $mime === 'image/webp') {
        if (function_exists('imagecreatefromstring')) {
            $img = imagecreatefromstring(file_get_contents($file['tmp_name']));
            if ($img) {
                imagejpeg($img, $target, 90);
                imagedestroy($img);
                echo json_encode(['success' => true, 'message' => 'Converted and saved as JPG']);
                return;
            }
        }
    }
    
    // Move file
    if (move_uploaded_file($file['tmp_name'], $target)) {
        echo json_encode(['success' => true, 'message' => 'Menu image uploaded']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to save file']);
    }
}

function handleAutoDetect(&$layout) {
    // This is a placeholder for auto-detection logic
    // In a real implementation, you would use image analysis
    echo json_encode([
        'success' => true,
        'detected' => [],
        'message' => 'Auto-detection completed. Please verify and adjust markers manually.'
    ]);
}
