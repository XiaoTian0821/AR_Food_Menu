/**
 * Compile Page - AR Marker Management
 * Handles marker creation, manipulation, and AR target compilation
 */

// Global marker array
let markers = [];

/**
 * Add a marker at given coordinates
 */
function addMarker(x, y, foodType) {
    const id = 'dish-' + Date.now();
    const marker = {
        id: id,
        type: foodType,
        name: FOOD_MODELS[foodType] || foodType,
        nx: x,
        ny: y,
        radius: 0.12,
        scale: 0.28
    };
    
    markers.push(marker);
    saveMarkers();
    renderMarkers();
    updateMarkerList();
}

/**
 * Save markers to API
 */
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

/**
 * Render markers on menu image
 */
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
        markerEl.title = marker.name;
        
        // Make draggable
        makeDraggable(markerEl, marker);
        
        preview.appendChild(markerEl);
    });
}

/**
 * Make a marker draggable
 */
function makeDraggable(element, marker) {
    let isDragging = false;
    let startX, startY;
    
    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        element.classList.add('selected');
        
        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX;
        startY = touch.clientY;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const touch = e.touches ? e.touches[0] : e;
        const preview = document.getElementById('menu-preview');
        const rect = preview.getBoundingClientRect();
        
        const dx = (touch.clientX - startX) / rect.width;
        const dy = (touch.clientY - startY) / rect.height;
        
        marker.nx = Math.max(0, Math.min(1, marker.nx + dx));
        marker.ny = Math.max(0, Math.min(1, marker.ny + dy));
        
        element.style.left = (marker.nx * 100) + '%';
        element.style.top = (marker.ny * 100) + '%';
    }
    
    function endDrag() {
        if (isDragging) {
            isDragging = false;
            element.classList.remove('selected');
            saveMarkers();
        }
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
    }
}

/**
 * Update marker list display
 */
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
            <span>
                <strong>${index + 1}.</strong> ${marker.name}
                <small style="color: #666;">(${Math.round(marker.nx * 100)}%, ${Math.round(marker.ny * 100)}%)</small>
            </span>
            <div>
                <select onchange="changeFoodType(${index}, this.value)" style="margin-right: 5px; padding: 5px;">
                    <option value="">Ignore</option>
                    ${Object.keys(FOOD_MODELS).map(type => 
                        `<option value="${type}" ${marker.type === type ? 'selected' : ''}>${FOOD_MODELS[type]}</option>`
                    ).join('')}
                </select>
                <button onclick="removeMarker(${index})" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">✕</button>
            </div>
        </div>
    `).join('');
}

/**
 * Change food type for a marker
 */
function changeFoodType(index, type) {
    if (!type) return;
    
    markers[index].type = type;
    markers[index].name = FOOD_MODELS[type] || type;
    
    saveMarkers();
    renderMarkers();
    updateMarkerList();
}

/**
 * Remove a marker
 */
function removeMarker(index) {
    markers.splice(index, 1);
    saveMarkers();
    renderMarkers();
    updateMarkerList();
}

/**
 * Auto-detect food photo regions
 */
function autoDetect() {
    const menuImage = document.getElementById('menu-image');
    
    // Create canvas for analysis
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = menuImage.naturalWidth || 800;
    canvas.height = menuImage.naturalHeight || 1200;
    
    ctx.drawImage(menuImage, 0, 0);
    
    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple detection: look for rectangular regions with different colors
    const detectedRegions = [];
    const minArea = 5000; // Minimum pixel area
    const maxArea = (canvas.width * canvas.height) * 0.3; // Maximum 30% of image
    
    // Scan for regions with distinct colors
    for (let y = 0; y < canvas.height - 50; y += 20) {
        for (let x = 0; x < canvas.width - 50; x += 20) {
            const regionColor = getAverageColor(data, x, y, 50, 50);
            const adjacentColor = getAverageColor(data, x + 60, y, 50, 50);
            
            // Check if colors are significantly different (likely a photo boundary)
            if (colorDistance(regionColor, adjacentColor) > 30) {
                // Found potential photo region
                const region = findConnectedRegion(data, x, y, 50, 50);
                if (region && region.area > minArea && region.area < maxArea) {
                    detectedRegions.push({
                        x: region.x / canvas.width,
                        y: region.y / canvas.height,
                        width: region.w / canvas.width,
                        height: region.h / canvas.height
                    });
                }
            }
        }
    }
    
    // Clear existing markers
    markers = [];
    
    // Add detected regions as markers (placeholder - in real implementation, would match to food types)
    detectedRegions.forEach((region, index) => {
        markers.push({
            id: 'dish-' + (index + 1),
            type: 'burger', // Default - operator would need to set
            name: 'Food ' + (index + 1),
            nx: region.x + region.width / 2,
            ny: region.y + region.height / 2,
            radius: 0.12,
            scale: 0.28
        });
    });
    
    saveMarkers();
    renderMarkers();
    updateMarkerList();
    
    // Show result
    if (detectedRegions.length === 0) {
        showStatus('No photos found automatically. Click the poster to add dish markers.', 'info');
    } else {
        showStatus(`Detected ${detectedRegions.length} regions. Please verify and assign food types.`, 'success');
    }
}

/**
 * Get average color in a region
 */
function getAverageColor(data, x, y, width, height) {
    let r = 0, g = 0, b = 0, count = 0;
    
    for (let i = y; i < y + height && i < data.length / 4; i++) {
        for (let j = x; j < x + width; j++) {
            const idx = (i * canvas.width + j) * 4;
            r += data[idx];
            g += data[idx + 1];
            b += data[idx + 2];
            count++;
        }
    }
    
    return {
        r: Math.round(r / count),
        g: Math.round(g / count),
        b: Math.round(b / count)
    };
}

/**
 * Find connected region of similar color
 */
function findConnectedRegion(data, startX, startY, minWidth, minHeight) {
    // Simplified region finding
    // In production, would use proper flood fill algorithm
    return {
        x: startX,
        y: startY,
        w: minWidth,
        h: minHeight,
        area: minWidth * minHeight
    };
}

/**
 * Calculate color distance
 */
function colorDistance(c1, c2) {
    return Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );
}
