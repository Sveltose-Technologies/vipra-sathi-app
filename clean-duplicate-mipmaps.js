const fs = require('fs');
const path = require('path');

const ANDROID_RES_PATH = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

const MIPMAP_FOLDERS = [
  'mipmap-mdpi',
  'mipmap-hdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi',
];

MIPMAP_FOLDERS.forEach(folder => {
  const folderPath = path.join(ANDROID_RES_PATH, folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath);
    files.forEach(file => {
      if (file.endsWith('.webp')) {
        const filePath = path.join(folderPath, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted duplicate webp file: ${filePath}`);
      }
    });
  }
});

console.log('Duplicate webp icon files cleaned up!');
