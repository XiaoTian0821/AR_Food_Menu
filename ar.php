<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>AR Scanner - Food Menu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #000;
            overflow: hidden;
        }
        
        #ar-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        
        #video-element {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: none;
        }
        
        #model-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        #ui-layer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
        }
        
        #ui-layer > * {
            pointer-events: auto;
        }
        
        .back-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 12px 24px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .back-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .status-bar {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #888;
        }
        
        .status-dot.active {
            background: #1dd1a1;
        }
        
        .status-dot.error {
            background: #ff6b6b;
        }
        
        #start-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #1dd1a1, #10ac84);
            color: #fff;
            border: none;
            padding: 25px 50px;
            border-radius: 50px;
            font-size: 1.3rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 10px 40px rgba(29, 209, 161, 0.4);
            transition: all 0.3s ease;
        }
        
        #start-button:hover {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 15px 50px rgba(29, 209, 161, 0.6);
        }
        
        #start-button:active {
            transform: translate(-50%, -50%) scale(0.95);
        }
        
        .food-controls {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 20px;
            display: none;
            backdrop-filter: blur(10px);
        }
        
        .food-controls label {
            color: #fff;
            font-size: 0.9rem;
            display: block;
            margin-bottom: 10px;
        }
        
        .food-controls select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #fff;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 1rem;
            min-width: 200px;
        }
        
        .food-controls select option {
            background: #1a1a2e;
            color: #fff;
        }
        
        .instructions {
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            padding: 12px 24px;
            border-radius: 20px;
            font-size: 0.9rem;
            display: none;
            backdrop-filter: blur(10px);
        }
        
        .food-name {
            position: absolute;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: bold;
            display: none;
            backdrop-filter: blur(10px);
        }
        
        .error-message {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 107, 107, 0.95);
            color: #fff;
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            max-width: 90%;
            width: 400px;
            display: none;
        }
        
        .error-message h3 {
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .error-message p {
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .error-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .error-buttons button {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: #fff;
            padding: 12px 24px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .error-buttons button:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            text-align: center;
            display: none;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top-color: #1dd1a1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            #start-button {
                padding: 20px 40px;
                font-size: 1.1rem;
            }
            
            .food-controls {
                width: 90%;
            }
            
            .food-controls select {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div id="ar-container">
        <video id="video-element" playsinline autoplay muted></video>
        <div id="model-container"></div>
    </div>
    
    <div id="ui-layer">
        <a href="index.php" class="back-btn">← Back</a>
        
        <div class="status-bar">
            <span class="status-dot" id="status-dot"></span>
            <span id="status-text">Ready</span>
        </div>
        
        <button id="start-button" onclick="startCamera()">
            📷 Start Camera
        </button>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>Starting camera...</p>
        </div>
        
        <div class="food-name" id="food-name"></div>
        
        <div class="instructions" id="instructions">
            👆 Tap anywhere to place a 3D food model
        </div>
        
        <div class="food-controls" id="food-controls">
            <label for="food-select">Select Food:</label>
            <select id="food-select" onchange="changeFood(this.value)">
                <option value="">-- Choose --</option>
                <option value="burger">🍔 Burger</option>
                <option value="pizza">🍕 Pizza</option>
                <option value="pasta">🍝 Pasta</option>
                <option value="fried-chicken">🍗 Fried Chicken</option>
                <option value="salad">🥗 Salad</option>
                <option value="skewers">🍢 Skewers</option>
                <option value="juice">🧃 Juice</option>
                <option value="wrap">🌯 Wrap</option>
                <option value="kebab">🥙 Kebab</option>
                <option value="roast">🍖 Roast</option>
                <option value="coffee">☕ Coffee</option>
                <option value="smoothie">🥤 Smoothie</option>
                <option value="iced-coffee">🧋 Iced Coffee</option>
                <option value="fried-platter">🍽️ Fried Platter</option>
            </select>
        </div>
        
        <div class="error-message" id="error-message">
            <h3>⚠️ Camera Error</h3>
            <p id="error-text">Unable to access camera</p>
            <div class="error-buttons">
                <button onclick="location.reload()">🔄 Retry</button>
                <button onclick="location.href='index.php'">🏠 Home</button>
            </div>
        </div>
    </div>

    <!-- Three.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    
    <!-- Food Models -->
    <script src="assets/js/foods.js"></script>
    
    <script>
        let scene, camera, renderer;
        let currentModel = null;
        let videoElement = null;
        let stream = null;
        
        async function startCamera() {
            const startBtn = document.getElementById('start-button');
            const loading = document.getElementById('loading');
            const videoElement = document.getElementById('video-element');
            
            startBtn.style.display = 'none';
            loading.style.display = 'block';
            updateStatus('error', 'Starting...');
            
            try {
                // Request camera access
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    },
                    audio: false
                });
                
                videoElement.srcObject = stream;
                videoElement.style.display = 'block';
                
                // Initialize Three.js
                initThreeJS();
                
                // Show controls
                loading.style.display = 'none';
                document.getElementById('food-controls').style.display = 'block';
                document.getElementById('instructions').style.display = 'block';
                updateStatus('active', 'Camera Active');
                
                // Add click handler
                document.getElementById('ar-container').addEventListener('click', handleTap);
                document.getElementById('ar-container').addEventListener('touchstart', handleTap);
                
                console.log('✓ Camera started successfully');
                
            } catch (error) {
                console.error('Camera error:', error);
                loading.style.display = 'none';
                startBtn.style.display = 'block';
                showError(error.message);
            }
        }
        
        function initThreeJS() {
            const container = document.getElementById('model-container');
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Create scene
            scene = new THREE.Scene();
            
            // Create camera
            camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100);
            camera.position.z = 5;
            
            // Create renderer
            renderer = new THREE.WebGLRenderer({ 
                alpha: true,
                antialias: true 
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            
            // Add lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(5, 10, 7);
            scene.add(directionalLight);
            
            const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
            backLight.position.set(-5, 5, -5);
            scene.add(backLight);
            
            // Handle resize
            window.addEventListener('resize', onWindowResize);
            
            // Start animation loop
            animate();
        }
        
        function handleTap(event) {
            event.preventDefault();
            
            // Get touch or click position
            const touch = event.touches ? event.touches[0] : event;
            const x = (touch.clientX / window.innerWidth) * 2 - 1;
            const y = -(touch.clientY / window.innerHeight) * 2 + 1;
            
            // Create or move model
            if (currentModel) {
                currentModel.position.x = x * 3;
                currentModel.position.y = y * 2;
            } else {
                createFoodModel(x, y);
            }
        }
        
        function createFoodModel(x, y) {
            // Get selected food type
            const select = document.getElementById('food-select');
            const foodType = select.value;
            
            if (!foodType || !FOOD_CREATORS[foodType]) {
                alert('Please select a food type first!');
                return;
            }
            
            // Remove old model
            if (currentModel) {
                scene.remove(currentModel);
            }
            
            // Create new model
            const createFn = FOOD_CREATORS[foodType];
            currentModel = createFn();
            currentModel.position.set(x * 3, y * 2, 0);
            scene.add(currentModel);
            
            // Show food name
            const foodName = document.getElementById('food-name');
            foodName.textContent = '🍽️ ' + (FOOD_MODELS[foodType] || foodType);
            foodName.style.display = 'block';
            
            setTimeout(() => {
                foodName.style.display = 'none';
            }, 2000);
        }
        
        function changeFood(foodType) {
            if (!foodType) return;
            
            // Create new model at center
            createFoodModel(0, 0);
        }
        
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate current model
            if (currentModel) {
                currentModel.rotation.y += 0.02;
            }
            
            // Render scene
            if (renderer) {
                renderer.render(scene, camera);
            }
        }
        
        function onWindowResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            
            renderer.setSize(width, height);
        }
        
        function updateStatus(state, text) {
            const dot = document.getElementById('status-dot');
            const statusText = document.getElementById('status-text');
            
            dot.className = 'status-dot ' + state;
            statusText.textContent = text;
        }
        
        function showError(message) {
            const errorDiv = document.getElementById('error-message');
            const errorText = document.getElementById('error-text');
            
            errorText.textContent = message;
            errorDiv.style.display = 'block';
            updateStatus('error', 'Error');
        }
        
        // Stop camera when leaving page
        window.addEventListener('beforeunload', stopCamera);
        
        function stopCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (renderer) {
                renderer.dispose();
            }
        }
    </script>
</body>
</html>
