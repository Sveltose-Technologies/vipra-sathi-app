const fs = require('fs');
const path = require('path');

const FONTS_SRC = path.join(__dirname, 'node_modules', 'react-native-vector-icons', 'Fonts');
const FONTS_DEST = path.join(__dirname, 'android', 'app', 'src', 'main', 'assets', 'fonts');

if (!fs.existsSync(FONTS_DEST)) {
  fs.mkdirSync(FONTS_DEST, { recursive: true });
}

if (fs.existsSync(FONTS_SRC)) {
  const fontFiles = fs.readdirSync(FONTS_SRC);
  fontFiles.forEach(file => {
    if (file.endsWith('.ttf')) {
      const srcFile = path.join(FONTS_SRC, file);
      const destFile = path.join(FONTS_DEST, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied font asset: ${file}`);
    }
  });
  console.log('All vector icon fonts successfully copied to android assets/fonts!');
} else {
  console.error('Vector icons Fonts folder not found!');
}
