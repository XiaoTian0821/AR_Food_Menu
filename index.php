<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AR Food Menu - Interactive Dining Experience</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">🍽️</div>
            <h1>AR Food Menu</h1>
            <p class="tagline">Experience your meal in augmented reality</p>
            
            <nav>
                <a href="menu.php" class="btn btn-primary">
                    <span>📋</span> Display Menu
                </a>
                <a href="ar.php" class="btn btn-secondary">
                    <span>📷</span> Scan Menu in AR
                </a>
                <a href="compile.php" class="btn btn-success">
                    <span>⚙️</span> Prepare AR Tracking
                </a>
            </nav>
        </header>

        <div class="main-content">
            <div class="card">
                <h2>🎯 What is AR Food Menu?</h2>
                <p>Our Augmented Reality Food Menu brings your dishes to life! Point your camera at the menu and see 3D models of food appear right on your screen.</p>
                <a href="menu.php" class="btn btn-primary">View Menu</a>
            </div>

            <div class="card">
                <h2>📱 How to Use</h2>
                <p>Simply scan the menu with your phone camera. The AR system will recognize the menu and display 3D food models when you point at each dish.</p>
                <a href="ar.php" class="btn btn-secondary">Start AR</a>
            </div>

            <div class="card">
                <h2>🔧 For Staff</h2>
                <p>Restaurant staff can upload new menus and configure AR tracking using the preparation tool.</p>
                <a href="compile.php" class="btn btn-success">Prepare AR</a>
            </div>
        </div>

        <div class="menu-preview">
            <img src="assets/images/menu.jpg" alt="Food Menu Preview" onerror="this.style.display='none'">
        </div>

        <div class="instructions">
            <h2>📖 How It Works</h2>
            <ol class="step-list">
                <li>
                    <span class="step-number">1</span>
                    <span>Open this website on your phone's browser</span>
                </li>
                <li>
                    <span class="step-number">2</span>
                    <span>Click "Scan Menu in AR" to start the camera</span>
                </li>
                <li>
                    <span class="step-number">3</span>
                    <span>Allow camera permission when prompted</span>
                </li>
                <li>
                    <span class="step-number">4</span>
                    <span>Point your camera at the food menu poster</span>
                </li>
                <li>
                    <span class="step-number">5</span>
                    <span>Move closer to a food photo to see its 3D model</span>
                </li>
                <li>
                    <span class="step-number">6</span>
                    <span>Move to another dish to switch the 3D model</span>
                </li>
            </ol>
        </div>

        <div class="qr-section">
            <h2>📱 Scan QR Code to Open on Phone</h2>
            <div class="qr-code">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://localhost/Ar_Food_Menu/index.php" 
                     alt="QR Code" 
                     style="max-width: 100%; height: auto;"
                     onerror="this.src='assets/images/qr-code.png'">
            </div>
            <p>Open camera and scan to access on your mobile device</p>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #888;">
                Or visit: <strong><?php echo 'http://' . $_SERVER['HTTP_HOST'] . '/Ar_Food_Menu/index.php'; ?></strong>
            </p>
            <p style="margin-top: 10px;">
                <a href="qr-generator.php" class="btn" style="padding: 8px 16px; font-size: 0.9rem;">🔄 生成新QR碼</a>
                <a href="qr-setup-guide.php" style="color: #1dd1a1; margin-left: 15px;">📖 需要幫助？</a>
            </p>
        </div>

        <footer>
            <p>&copy; 2026 AR Food Menu System. Built with Three.js & MindAR</p>
        </footer>
    </div>
    
    <script src="assets/js/app.js"></script>
</body>
</html>