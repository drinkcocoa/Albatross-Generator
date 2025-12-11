# 🦅 Albatross Generator

An interactive 3D albatross generator built with p5.js. Create and customize your own unique albatross birds with real-time controls and beautiful 3D rendering.

Created by **Jay** and **Dilano** at **Sogang University**.

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![p5.js](https://img.shields.io/badge/p5.js-1.7.0-pink.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

### 🎨 Customization Options
- **Head**: Adjust size and color
- **Eyes**: Customize size and color
- **Beak**: Control length and color
- **Neck**: Adjust length, angle, and color
- **Body**: Modify width, length, and color
- **Wings**: Control length, thickness, and color
- **Legs**: Customize length and color
- **Hats**: Choose from multiple hat styles (none, mortarboard, conical hat, party hat)
- **Backgrounds**: Select from 4 different scenic backgrounds

### 🎮 Interactive Controls
- **Real-time Updates**: See changes instantly as you adjust sliders
- **3D Camera Control**: Drag to rotate, scroll to zoom
- **Value Display**: Live preview of all parameter values
- **Reset Button**: Instantly restore default settings
- **Randomize Button**: Generate random albatross designs with one click
- **Save Functionality**: Export your creation as PNG with descriptive filenames

### ⌨️ Keyboard Shortcuts
- `S` - Save current design as image
- `R` - Randomize all parameters
- `D` - Reset to default values
- `H` - Toggle help panel

### 📱 Mobile Support
- Fully responsive design
- Touch-optimized controls
- Works on all modern browsers and devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/drinkcocoa/Albatross-Generator.git
   cd Albatross-Generator
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance:

   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js:**
   ```bash
   npx http-server
   ```

   Then navigate to `http://localhost:8000` in your browser.

3. **Start creating!**
   - Adjust the sliders and color pickers to design your albatross
   - Use the buttons for quick actions
   - Press `H` for keyboard shortcuts

## 📁 Project Structure

```
Albatross-Generator/
├── index.html              # Main HTML file
├── README.md              # This file
├── LICENSE                # Apache 2.0 License
├── .gitignore            # Git ignore rules
├── assets/
│   ├── fonts/
│   │   └── default_font.ttf    # Custom font
│   └── images/
│       ├── backImage1.jpg      # Background image 1
│       ├── backImage2.jpg      # Background image 2
│       ├── backImage3.jpg      # Background image 3
│       └── backImage4.jpg      # Background image 4
├── css/
│   └── style.css         # Styling and responsive design
└── js/
    └── sketch.js         # Main p5.js application logic
```

## 🎯 Usage Guide

### Basic Controls

1. **Adjusting Parameters**
   - Use sliders to change numerical values (size, length, etc.)
   - Click color pickers to choose custom colors
   - Use dropdowns to select hats and backgrounds

2. **Camera Navigation**
   - **Rotate**: Click and drag to orbit around the albatross
   - **Zoom**: Use mouse scroll wheel to zoom in/out
   - The camera is constrained to prevent going too far

3. **Saving Your Design**
   - Click "Save Image" button or press `S`
   - Image saves as `albatross-YYYY-MM-DD-###.png`
   - Filename includes date and random number for uniqueness

4. **Quick Actions**
   - **Reset**: Restore all settings to defaults
   - **Randomize**: Generate a completely random albatross
   - **Help**: View keyboard shortcuts and controls

### Tips for Best Results

- Experiment with extreme values for creative designs
- Use the randomize button for inspiration
- Try different background images to match your albatross style
- Save multiple versions to compare designs

## 🛠️ Technical Details

### Technologies Used
- **p5.js 1.7.0**: Creative coding library for 3D graphics
- **HTML5 Canvas**: For rendering
- **WebGL**: Hardware-accelerated 3D rendering
- **CSS3**: Modern styling and animations
- **JavaScript ES6+**: Modern JavaScript features

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Optimized for 60 FPS rendering
- Efficient use of WebGL
- Minimal memory footprint
- Responsive across all device sizes

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the Albatross Generator:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions
- Additional hat styles
- More background images
- Animation features
- Preset bird designs
- Export to different formats (SVG, OBJ)
- Color palette presets
- Undo/redo functionality

## 📝 Code Structure

### Constants (DEFAULTS)
All magic numbers are extracted into a well-organized `DEFAULTS` object for easy modification and maintenance.

### Main Functions
- `preload()`: Load assets before setup
- `setup()`: Initialize canvas and UI controls
- `draw()`: Main render loop
- `createControls()`: Set up UI elements
- `resetToDefaults()`: Reset all parameters
- `randomizeValues()`: Randomize all parameters
- `saveImage()`: Export current design

### Rendering Pipeline
1. Read control values
2. Draw background sphere
3. Apply camera transforms
4. Render body (origin point)
5. Render wings, legs, neck, head
6. Render eyes, beak, hat
7. Overlay UI panel and help

## 🐛 Known Issues

- None currently! Please report any bugs in the Issues section.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Jay** - Co-creator
- **Dilano** - Co-creator

Created at **Sogang University**

## 🙏 Acknowledgments

- p5.js community for the amazing creative coding library
- Sogang University for supporting this project
- All contributors and users of the Albatross Generator

## 📧 Contact

For questions, suggestions, or feedback:
- Open an issue on GitHub
- Star the project if you find it useful!

---

**Happy Albatross Creating! 🦅✨**

Made with ❤️ by Jay and Dilano
