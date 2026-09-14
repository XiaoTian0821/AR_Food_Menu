# AR Food Menu System

A complete web-based Augmented Reality food menu system using PHP, Three.js, and MindAR.

## Features

- 📱 Mobile-friendly AR scanner
- 🍔 14 built-in 3D food models
- 📷 Image target recognition
- 🔄 Real-time model switching
- 📋 Menu upload and configuration
- 🎯 Manual and auto marker placement

## Requirements

- PHP 8.3+
- Apache/Nginx web server
- Modern browser (Chrome/Edge recommended)
- HTTPS for camera access on mobile
- Camera permissions

## Installation

1. Copy the project to your web server directory (e.g., `C:\xampp\htdocs\AR_Food_Menu\`)
2. Ensure the `assets/images` and `assets/targets` directories are writable
3. Access via browser: `http://localhost/AR_Food_Menu/`

## Usage

### For Customers
1. Open the website on your phone
2. Click "Display Menu" to view the menu
3. Click "Scan Menu in AR" to start augmented reality
4. Allow camera permissions
5. Point camera at the menu image
6. Move closer to food photos to see 3D models

### For Restaurant Staff
1. Go to "Prepare AR Tracking"
2. Upload the menu image
3. Add markers by clicking on food photos
4. Assign food types to each marker
5. Compile the AR target
6. Test in AR mode

## File Structure

```
AR_Food_Menu/
├── index.php              # Home page
├── menu.php               # Menu display
├── ar.php                 # AR scanner
├── compile.php            # AR preparation
├── api.php                # Backend API
├── assets/
│   ├── css/
│   │   └── style.css      # Main styles
│   ├── js/
│   │   ├── foods.js       # 3D food models
│   │   ├── ar.js          # AR system
│   │   ├── compile.js     # Marker management
│   │   └── app.js         # Utilities
│   ├── images/
│   │   └── menu.jpg       # Menu image
│   └── targets/
│       ├── layout.json    # Marker configuration
│       └── mindar-image-target.cdf # AR target (compiled)
└── uploads/               # Temporary upload folder
```

## 3D Food Models

The system includes 14 stylized 3D food models:
1. Burger
2. Pizza
3. Pasta
4. Fried Chicken
5. Salad
6. Skewers
7. Juice
8. Wrap
9. Kebab
10. Roast
11. Coffee
12. Smoothie
13. Iced Coffee
14. Fried Platter

## Technologies Used

- **PHP 8.3+** - Backend processing
- **HTML5/CSS3** - UI and styling
- **Vanilla JavaScript** - Client-side logic
- **Three.js r128** - 3D rendering
- **MindAR** - Image target AR tracking

## Browser Compatibility

- Chrome 80+ (recommended)
- Edge 80+
- Safari 14+ (iOS 14+)
- Firefox 75+

## Notes

- Camera access requires HTTPS (except localhost)
- The AR target file (`mindar-image-target.cdf`) must be compiled using MindAR's offline compiler
- Use the compile.php page to configure markers for your menu
- Test on actual mobile devices for best results

## License

MIT License - Free to use and modify
