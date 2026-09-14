<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food Menu - AR Food Menu</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .menu-container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 30px;
            margin-top: 20px;
        }
        
        .menu-image {
            width: 100%;
            max-width: 800px;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: block;
            margin: 0 auto;
        }
        
        .back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 100;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="index.php" class="btn btn-primary back-btn">
            <span>⬅️</span> Back
        </a>
        
        <header>
            <div class="logo">📋</div>
            <h1>Our Food Menu</h1>
            <p class="tagline">Point your camera at this menu to see 3D food models in AR</p>
            
            <nav>
                <a href="ar.php" class="btn btn-secondary">
                    <span>📷</span> Start AR Scan
                </a>
            </nav>
        </header>

        <div class="menu-container">
            <img src="assets/images/menu.jpg" alt="Food Menu" class="menu-image" onerror="this.src='assets/images/menu.jpg'">
            
            <div style="text-align: center; margin-top: 20px; color: #888;">
                <p>💡 <strong>Tip:</strong> Use the "Scan Menu in AR" button to see 3D food models</p>
            </div>
        </div>

        <footer>
            <p>&copy; 2026 AR Food Menu System</p>
        </footer>
    </div>
</body>
</html>
