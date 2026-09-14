# MindAR Image Target File

This file should contain the compiled MindAR image target data.

## How to Generate

1. Download the MindAR offline compiler:
   ```bash
   npm install -g @hiukim/mind-ar-js
   ```

2. Compile your menu image:
   ```bash
   mindar-image-compile assets/images/menu.jpg assets/targets/mindar-image-target.cdf
   ```

3. Place the generated `.cdf` file in the `assets/targets/` directory

## Alternative: Online Compiler

You can also use the online compiler at:
https://hiukim.github.io/mind-ar-js-doc/tools/compile

Upload your menu image and download the compiled target file.
