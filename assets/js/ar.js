/**
 * AR Food System - Main AR Scanner Controller
 * Uses MindAR for image target tracking and Three.js for 3D rendering
 */

// Make ARFoodSystem available globally
window.ARFoodSystem = (function() {
    
    function ARFoodSystem() {
        this.container = document.getElementById('ar-container');
        this.video = document.getElementById('video-element');
        this.modelContainer = document.getElementById('model-container');
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mindAR = null;
        this.targetImage = null;
        this.currentModel = null;
        this.models = {};
        this.layout = null;
        
        this.isRunning = false;
        this.animationId = null;
        
        // Animation state
        this.time = 0;
        this.baseRotationSpeed = 0.02;
    }
    
    ARFoodSystem.prototype.init = async function() {
        try {
            // Load layout configuration
            await this.loadLayout();
            
            // Initialize Three.js scene
            this.initScene();
            
            // Check for HTTPS requirement
            if (window.location.protocol !== 'https:' && 
                window.location.hostname !== 'localhost' && 
                window.location.hostname !== '127.0.0.1') {
                throw new Error('HTTPS is required for camera access. Please use a secure connection.');
            }
            
            // Verify all required libraries are loaded
            if (typeof THREE === 'undefined') {
                throw new Error('Three.js library not loaded. Please check your internet connection.');
            }
            
            if (typeof MindARImage === 'undefined') {
                throw new Error('MindAR library not loaded. Please check your internet connection.');
            }
            
            if (typeof FOOD_MODELS === 'undefined' || typeof FOOD_CREATORS === 'undefined') {
                throw new Error('Food models not loaded. Please refresh the page.');
            }
            
            console.log('All libraries verified, starting AR...');
            
            // Start AR
            await this.startAR();
            
        } catch (error) {
            console.error('AR initialization error:', error);
            throw error;
        }
    };
    
    ARFoodSystem.prototype.loadLayout = async function() {
        try {
            const response = await fetch('assets/targets/layout.json');
            this.layout = await response.json();
        } catch (e) {
            console.warn('Could not load layout, using defaults:', e);
            this.layout = {
                version: 1,
                imageWidth: 800,
                imageHeight: 1200,
                dishes: []
            };
        }
    };
    
    ARFoodSystem.prototype.initScene = function() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 100);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.modelContainer.appendChild(this.renderer.domElement);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        this.scene.add(directionalLight);
        
        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(-5, 5, -5);
        this.scene.add(backLight);
        
        // Pre-create all food models
        this.createAllModels();
        
        // Handle resize
        window.addEventListener('resize', () => this.onResize());
    };
    
    ARFoodSystem.prototype.createAllModels = function() {
        // Import FOOD_CREATORS
        if (typeof FOOD_CREATORS === 'undefined') {
            console.error('Food models not loaded');
            return;
        }
        
        // Create and position models for each dish
        if (this.layout && this.layout.dishes) {
            this.layout.dishes.forEach((dish, index) => {
                const createFn = FOOD_CREATORS[dish.type];
                if (createFn) {
                    const model = createFn();
                    model.visible = false;
                    model.userData = { 
                        dishId: dish.id,
                        type: dish.type,
                        name: dish.name,
                        targetX: dish.nx,
                        targetY: dish.ny
                    };
                    
                    // Position models above their target locations
                    model.position.set(
                        (dish.nx - 0.5) * 2,
                        dish.ny * 1.5 + 0.3,
                        0.5
                    );
                    
                    this.models[dish.id] = model;
                    this.scene.add(model);
                }
            });
        }
    };
    
    ARFoodSystem.prototype.startAR = async function() {
        try {
            // Check if MindAR is available
            if (typeof MindARImage === 'undefined') {
                throw new Error('MindAR library not loaded. Please check your internet connection or try refreshing the page.');
            }
            
            // Check if target file exists
            const targetFile = 'assets/targets/mindar-image-target.cdf';
            console.log('Loading AR target from:', targetFile);
            
            // Initialize MindAR
            this.mindAR = new MindARImage({
                imageTargetSrc: targetFile,
                video: this.video,
                canvas: this.renderer.domElement
            });
            
            // Start tracking
            await this.mindAR.start();
            
            // Set up tracking callbacks
            const self = this;
            this.mindAR.onTargetFound = function(targets) { self.onTargetFound(targets); };
            this.mindAR.onTargetLost = function() { self.onTargetLost(); };
            
            // Start animation loop
            this.isRunning = true;
            this.animate();
            
            // Update UI
            if (window.ARFoodUI) {
                window.ARFoodUI.updateStatus('tracking', 'AR Active');
            }
            
            console.log('AR system started successfully');
            
        } catch (error) {
            console.error('AR initialization error:', error);
            throw error;
        }
    };
    
    ARFoodSystem.prototype.onTargetFound = function(targets) {
        // Hide camera feed and show AR content
        this.video.style.display = 'none';
        
        // Start rendering
        this.renderer.domElement.style.display = 'block';
    };
    
    ARFoodSystem.prototype.onTargetLost = function() {
        // Hide all models when target is lost
        Object.values(this.models).forEach(model => {
            model.visible = false;
        });
        
        // Show camera feed again
        this.video.style.display = 'block';
        this.renderer.domElement.style.display = 'none';
        
        // Update UI
        if (window.ARFoodUI) {
            window.ARFoodUI.updateStatus('scanning', 'Point at menu');
            window.ARFoodUI.hideFoodName();
        }
    };
    
    ARFoodSystem.prototype.updateModels = function() {
        // Find the closest dish to the center of the screen
        let closestDish = null;
        let closestDistance = Infinity;
        
        Object.values(this.models).forEach(model => {
            if (!model.visible) return;
            
            // Project 3D position to screen space
            const position = model.position.clone();
            position.project(this.camera);
            
            // Calculate distance from center (0, 0)
            const distance = Math.sqrt(position.x * position.x + position.y * position.y);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestDish = model;
            }
        });
        
        // Show/hide models based on proximity
        Object.values(this.models).forEach(model => {
            if (model === closestDish && closestDistance < 0.5) {
                if (!model.visible) {
                    model.visible = true;
                    // Update UI with food name
                    if (window.ARFoodUI) {
                        window.ARFoodUI.showFoodName(model.userData.name);
                    }
                }
            } else {
                model.visible = false;
            }
        });
        
        // Animate visible models
        Object.values(this.models).forEach(model => {
            if (model.visible) {
                // Continuous rotation animation
                model.rotation.y += this.baseRotationSpeed;
                
                // Gentle floating motion
                model.position.y += Math.sin(this.time * 2) * 0.0005;
            }
        });
    };
    
    ARFoodSystem.prototype.animate = function() {
        if (!this.isRunning) return;
        
        this.time += 0.016; // ~60fps
        
        // Update AR system
        if (this.mindAR) {
            this.mindAR.render(this.scene, this.camera);
        }
        
        // Update model positions and animations
        this.updateModels();
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
        
        // Continue animation
        const self = this;
        this.animationId = requestAnimationFrame(function() { self.animate(); });
    };
    
    ARFoodSystem.prototype.onResize = function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    };
    
    ARFoodSystem.prototype.stop = function() {
        this.isRunning = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.mindAR) {
            this.mindAR.stop();
        }
        
        // Clean up
        this.video.style.display = 'block';
        this.renderer.domElement.style.display = 'none';
    };
    
    return ARFoodSystem;
})();
