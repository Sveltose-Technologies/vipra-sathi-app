const fs = require('fs');
const path = require('path');

const ANDROID_RES_PATH = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

const DRAWABLE_FOLDERS = [
  'drawable',
  'drawable-mdpi',
  'drawable-hdpi',
  'drawable-xhdpi',
  'drawable-xxhdpi',
  'drawable-xxxhdpi',
];

// 1. Rename all splashscreen_logo.png to splashscreen_image.png
DRAWABLE_FOLDERS.forEach(folder => {
  const folderPath = path.join(ANDROID_RES_PATH, folder);
  const oldPng = path.join(folderPath, 'splashscreen_logo.png');
  const newPng = path.join(folderPath, 'splashscreen_image.png');
  
  if (fs.existsSync(oldPng)) {
    fs.renameSync(oldPng, newPng);
    console.log(`Renamed splashscreen_logo.png to splashscreen_image.png in ${folder}`);
  }
});

// 2. Create splashscreen_logo.xml in res/drawable/
const splashXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splashscreen_background" />
    <item
        android:width="200dp"
        android:height="200dp"
        android:gravity="center">
        <bitmap
            android:gravity="fill"
            android:src="@drawable/splashscreen_image" />
    </item>
</layer-list>
`;

const splashXmlPath = path.join(ANDROID_RES_PATH, 'drawable', 'splashscreen_logo.xml');
fs.writeFileSync(splashXmlPath, splashXmlContent, 'utf8');
console.log('Created splashscreen_logo.xml layer-list!');

// 3. Update ic_launcher_background.xml
const launcherBgXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/splashscreen_background"/>
  <item>
    <bitmap android:gravity="center" android:src="@drawable/splashscreen_image"/>
  </item>
</layer-list>`;

const launcherBgXmlPath = path.join(ANDROID_RES_PATH, 'drawable', 'ic_launcher_background.xml');
fs.writeFileSync(launcherBgXmlPath, launcherBgXmlContent, 'utf8');
console.log('Updated ic_launcher_background.xml!');
