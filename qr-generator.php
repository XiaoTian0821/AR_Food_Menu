<?php
// QR Code Generator Page
$url = isset($_GET['url']) ? $_GET['url'] : 'http://localhost/Ar_Food_Menu/index.php';
$size = isset($_GET['size']) ? intval($_GET['size']) : 300;

// Validate URL
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    $url = 'http://localhost/Ar_Food_Menu/index.php';
}
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR碼生成器 - AR Food Menu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Microsoft JhengHei', 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            padding: 20px;
            color: #fff;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            margin-bottom: 30px;
            color: #feca57;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }
        
        .card h2 {
            color: #1dd1a1;
            margin-bottom: 15px;
        }
        
        .input-group {
            margin-bottom: 15px;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 5px;
            color: #ccc;
        }
        
        .input-group input,
        .input-group select {
            width: 100%;
            padding: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 1rem;
        }
        
        .input-group input:focus,
        .input-group select:focus {
            outline: none;
            border-color: #1dd1a1;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #1dd1a1, #10ac84);
            color: #000;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .btn:hover {
            transform: scale(1.05);
        }
        
        .btn-secondary {
            background: linear-gradient(135deg, #48dbfb, #0abde3);
        }
        
        .qr-preview {
            text-align: center;
            margin: 20px 0;
        }
        
        .qr-preview img {
            max-width: 300px;
            border: 5px solid #fff;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .quick-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .quick-links a {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            text-decoration: none;
            color: #fff;
            transition: all 0.3s ease;
        }
        
        .quick-links a:hover {
            background: rgba(29, 209, 161, 0.3);
            transform: translateY(-3px);
        }
        
        .tip {
            background: rgba(254, 202, 87, 0.2);
            border-left: 4px solid #feca57;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .card {
                padding: 15px;
            }
            
            h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📱 QR碼生成器</h1>
        
        <div class="card">
            <h2>🎯 生成QR碼</h2>
            <form method="GET" action="">
                <div class="input-group">
                    <label for="url">網址:</label>
                    <input type="url" id="url" name="url" 
                           value="<?php echo htmlspecialchars($url); ?>" 
                           placeholder="http://localhost/Ar_Food_Menu/index.php">
                </div>
                
                <div class="input-group">
                    <label for="size">大小:</label>
                    <select id="size" name="size">
                        <option value="150" <?php echo $size == 150 ? 'selected' : ''; ?>>小 (150x150)</option>
                        <option value="300" <?php echo $size == 300 ? 'selected' : ''; ?>>中 (300x300)</option>
                        <option value="500" <?php echo $size == 500 ? 'selected' : ''; ?>>大 (500x500)</option>
                        <option value="1024" <?php echo $size == 1024 ? 'selected' : ''; ?>>超大 (1024x1024)</option>
                    </select>
                </div>
                
                <button type="submit" class="btn">🔄 生成QR碼</button>
            </form>
        </div>
        
        <div class="card">
            <h2>📸 QR碼預覽</h2>
            <div class="qr-preview">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=<?php echo $size; ?>&data=<?php echo urlencode($url); ?>" 
                     alt="QR Code" 
                     onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=<?php echo $size; ?>&data=http://localhost/Ar_Food_Menu/index.php'">
            </div>
            <p style="text-align: center; color: #888; margin-top: 15px;">
                掃描此QR碼即可訪問: <strong><?php echo htmlspecialchars($url); ?></strong>
            </p>
            
            <div class="tip">
                <strong>💡 提示:</strong> 手機掃描時請確保：
                <ul style="margin-left: 20px; margin-top: 10px;">
                    <li>手機和電腦在同一個WiFi網絡</li>
                    <li>XAMPP Apache 正在運行</li>
                    <li>使用正確的IP地址（而非localhost）</li>
                </ul>
            </div>
        </div>
        
        <div class="card">
            <h2>🚀 快速訪問</h2>
            <div class="quick-links">
                <a href="index.php">🏠 主頁</a>
                <a href="ar.php">📷 AR掃描器</a>
                <a href="menu.php">📋 菜單</a>
                <a href="compile.php">⚙️ 設置</a>
            </div>
        </div>
        
        <div class="card">
            <h2>📖 常見問題</h2>
            <p><strong>Q: 掃描後無法打開網頁？</strong></p>
            <p>A: 確保手機和電腦在同一個WiFi網絡，並且使用IP地址而非localhost。</p>
            
            <p style="margin-top: 15px;"><strong>Q: 如何找到IP地址？</strong></p>
            <p>A: 在電腦上打開CMD，運行 <code>ipconfig</code>，查找 "IPv4 位址"。</p>
            
            <p style="margin-top: 15px;"><strong>Q: 需要安裝什麼軟件？</strong></p>
            <p>A: 只需要XAMPP和瀏覽器，無需額外軟件。</p>
        </div>
    </div>
</body>
</html>
