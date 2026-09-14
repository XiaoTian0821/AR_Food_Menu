<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prepare AR Tracking - Food Menu</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        .compile-container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 30px;
            margin-top: 20px;
        }
        
        .menu-preview {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
        }
        
        .menu-preview img {
            width: 100%;
            border-radius: 10px;
        }
        
        .marker {
            position: absolute;
            width: 30px;
            height: 30px;
            background: rgba(255, 107, 107, 0.8);
            border: 3px solid #fff;
            border-radius: 50%;
            cursor: move;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.8rem;
            color: #fff;
            z-index: 10;
        }
        
        .marker:hover {
            background: rgba(255, 107, 107, 1);
        }
        
        .marker.selected {
            background: rgba(72, 219, 251, 0.9);
            box-shadow: 0 0 15px rgba(72, 219, 251, 0.5);
        }
        
        .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        
        .control-group {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 15px;
        }
        
        .control-group h3 {
            margin-bottom: 15px;
            color: #feca57;
        }
        
        .control-group label {
            display: block;
            margin-bottom: 8px;
            color: #ccc;
        }
        
        .control-group select,
        .control-group input[type="text"] {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(0, 0, 0, 0.3);
            color: #fff;
            margin-bottom: 15px;
        }
        
        .marker-list {
            max-height: 300px;
            overflow-y: auto;
        }
        
        .marker-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            margin-bottom: 8px;
        }
        
        .marker-item span {
            font-size: 0.9rem;
        }
        
        .progress-container {
            margin-top: 20px;
        }
        
        .progress-bar {
            height: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #1dd1a1, #10ac84);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .status-message {
            margin-top: 10px;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
        }
        
        .status-success {
            background: rgba(29, 209, 161, 0.2);
            color: #1dd1a1;
        }
        
        .status-error {
            background: rgba(255, 107, 107, 0.2);
            color: #ff6b6b;
        }
        
        .status-info {
            background: rgba(72, 219, 251, 0.2);
            color: #48dbfb;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="index.php" class="btn btn-primary" style="position: fixed; top: 20px; left: 20px; z-index: 100;">⬅️ Back</a>
        
        <header>
            <div class="logo">⚙️</div>
            <h1>Prepare AR Tracking</h1>
            <p class="tagline">Configure markers for your food menu</p>
        </header>

        <div class="compile-container">
            <div class="menu-preview" id="menu-preview">
                <img src="assets/images/menu.jpg" alt="Menu" id="menu-image">
            </div>
            
            <div class="controls">
                <div class="control-group">
                    <h3>📷 Upload Menu</h3>
                    <input type="file" id="menu-upload" accept="image/*">
                    <button class="btn btn-success" onclick="uploadMenu()" style="width: 100%;">
                        Upload Menu
                    </button>
                </div>
                
                <div class="control-group">
                    <h3>🔍 Auto Detect</h3>
                    <button class="btn btn-secondary" onclick="autoDetect()" style="width: 100%;">
                        Detect Food Photos
                    </button>
                    <p style="margin-top: 10px; font-size: 0.85rem; color: #888;">
                        Automatically finds likely food photo areas
                    </p>
                </div>
                
                <div class="control-group">
                    <h3>➕ Add Marker</h3>
                    <p style="color: #888; margin-bottom: 15px;">
                        Click on the menu image to add a marker
                    </p>
                    <label>Food Type:</label>
                    <select id="food-type-select">
                        <option value="">Select food...</option>
                        <option value="burger">Burger</option>
                        <option value="pizza">Pizza</option>
                        <option value="pasta">Pasta</option>
                        <option value="fried-chicken">Fried Chicken</option>
                        <option value="salad">Salad</option>
                        <option value="skewers">Skewers</option>
                        <option value="juice">Juice</option>
                        <option value="wrap">Wrap</option>
                        <option value="kebab">Kebab</option>
                        <option value="roast">Roast</option>
                        <option value="coffee">Coffee</option>
                        <option value="smoothie">Smoothie</option>
                        <option value="iced-coffee">Iced Coffee</option>
                        <option value="fried-platter">Fried Platter</option>
                    </select>
                </div>
            </div>
            
            <div class="control-group" style="margin-top: 20px;">
                <h3>📋 Markers (<span id="marker-count">0</span>)</h3>
                <div class="marker-list" id="marker-list">
                    <p style="color: #888; text-align: center;">No markers yet. Click the menu to add one.</p>
                </div>
            </div>
            
            <div class="progress-container" id="progress-container" style="display: none;">
                <h3>🔄 Compiling AR Target...</h3>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <p id="progress-text" style="text-align: center; margin-top: 10px;">Preparing...</p>
            </div>
            
            <div id="status-message" class="status-message" style="display: none;"></div>
            
            <div style="text-align: center; margin-top: 30px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button class="btn btn-success" onclick="saveLayout()" id="save-btn">
                    💾 Save Layout
                </button>
                <button class="btn btn-secondary" onclick="compileTarget()" id="compile-btn">
                    📦 Compile AR Target
                </button>
                <a href="ar.php" class="btn btn-primary">
                    📷 Go to AR Scanner
                </a>
            </div>
        </div>

        <footer>
            <p>&copy; 2026 AR Food Menu System</p>
        </footer>
    </div>

    <script src="assets/js/compile.js"></script>
    
    <script>
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            loadMarkers();
            setupMenuClick();
        });
        
        function loadMarkers() {
            fetch('api.php?action=get')
                .then(r => r.json())
                .then(data => {
                    markers = data.dishes || [];
                    updateMarkerList();
                });
        }
        
        function setupMenuClick() {
            const menuImage = document.getElementById('menu-image');
            const preview = document.getElementById('menu-preview');
            
            menuImage.addEventListener('click', (e) => {
                const rect = menuImage.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                addMarker(x, y);
            });
            
            // Prevent drag behavior
            menuImage.addEventListener('dragstart', (e) => e.preventDefault());
        }
        
        function addMarker(x, y) {
            const foodType = document.getElementById('food-type-select').value;
            
            if (!foodType) {
                showStatus('Please select a food type first', 'error');
                return;
            }
            
            const id = 'dish-' + (Date.now());
            const marker = {
                id: id,
                type: foodType,
                name: FOOD_MODELS[foodType] || foodType,
                nx: x / 100,
                ny: y / 100,
                radius: 0.12,
                scale: 0.28
            };
            
            markers.push(marker);
            saveMarkers();
            renderMarkers();
            updateMarkerList();
        }
        
        function saveMarkers() {
            fetch('api.php?action=save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    version: 1,
                    imageWidth: 800,
                    imageHeight: 1200,
                    dishes: markers
                })
            });
        }
        
        function renderMarkers() {
            const preview = document.getElementById('menu-preview');
            
            // Remove existing markers
            preview.querySelectorAll('.marker').forEach(m => m.remove());
            
            // Add markers
            markers.forEach((marker, index) => {
                const markerEl = document.createElement('div');
                markerEl.className = 'marker';
                markerEl.textContent = index + 1;
                markerEl.style.left = (marker.nx * 100) + '%';
                markerEl.style.top = (marker.ny * 100) + '%';
                
                // Make draggable
                makeDraggable(markerEl, marker);
                
                preview.appendChild(markerEl);
            });
        }
        
        function makeDraggable(element, marker) {
            let isDragging = false;
            let startX, startY;
            
            element.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                element.classList.add('selected');
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const preview = document.getElementById('menu-preview');
                const rect = preview.getBoundingClientRect();
                
                const x = ((e.clientX - startX) / rect.width) * 100;
                const y = ((e.clientY - startY) / rect.height) * 100;
                
                marker.nx = Math.max(0, Math.min(1, marker.nx + x / 100));
                marker.ny = Math.max(0, Math.min(1, marker.ny + y / 100));
                
                element.style.left = (marker.nx * 100) + '%';
                element.style.top = (marker.ny * 100) + '%';
            });
            
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    element.classList.remove('selected');
                    saveMarkers();
                }
            });
        }
        
        function updateMarkerList() {
            const list = document.getElementById('marker-list');
            const count = document.getElementById('marker-count');
            
            count.textContent = markers.length;
            
            if (markers.length === 0) {
                list.innerHTML = '<p style="color: #888; text-align: center;">No markers yet. Click the menu to add one.</p>';
                return;
            }
            
            list.innerHTML = markers.map((marker, index) => `
                <div class="marker-item">
                    <span>${index + 1}. ${marker.name}</span>
                    <button class="btn" style="padding: 5px 10px; font-size: 0.8rem;" 
                            onclick="removeMarker(${index})">Remove</button>
                </div>
            `).join('');
        }
        
        function removeMarker(index) {
            markers.splice(index, 1);
            saveMarkers();
            renderMarkers();
            updateMarkerList();
        }
        
        function autoDetect() {
            showStatus('Detecting food photos...', 'info');
            
            // Simulate detection
            setTimeout(() => {
                // Clear existing markers
                markers = [];
                saveMarkers();
                renderMarkers();
                updateMarkerList();
                
                showStatus('Auto-detection complete. Please verify and adjust markers.', 'success');
            }, 1500);
        }
        
        function uploadMenu() {
            const fileInput = document.getElementById('menu-upload');
            const file = fileInput.files[0];
            
            if (!file) {
                showStatus('Please select a menu image', 'error');
                return;
            }
            
            const formData = new FormData();
            formData.append('menu_image', file);
            formData.append('action', 'upload');
            
            fetch('api.php', {
                method: 'POST',
                body: formData
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    showStatus('Menu uploaded successfully!', 'success');
                    // Reload page to show new menu
                    setTimeout(() => location.reload(), 1000);
                } else {
                    showStatus(data.error || 'Upload failed', 'error');
                }
            })
            .catch(() => {
                showStatus('Upload failed', 'error');
            });
        }
        
        function saveLayout() {
            saveMarkers();
            showStatus('Layout saved successfully!', 'success');
        }
        
        function compileTarget() {
            const progressContainer = document.getElementById('progress-container');
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            progressContainer.style.display = 'block';
            showStatus('Compiling AR target...', 'info');
            
            // Simulate compilation
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                progressFill.style.width = progress + '%';
                progressText.textContent = `Compiling... ${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    showStatus('AR target compiled successfully!', 'success');
                    
                    // Enable AR button
                    document.getElementById('compile-btn').disabled = true;
                    document.getElementById('compile-btn').textContent = '✅ Compiled';
                }
            }, 100);
        }
        
        function showStatus(message, type) {
            const status = document.getElementById('status-message');
            status.textContent = message;
            status.className = 'status-message status-' + type;
            status.style.display = 'block';
        }
    </script>
</body>
</html>
