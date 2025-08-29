const fs = require('fs');
const https = require('https');
const path = require('path');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Download the logo
const logoUrl = 'https://dcdn-us.mitiendanube.com/stores/003/604/617/themes/common/logo-1304688765-1693235008-d1092404bfa896ab9481292b91a0afef1693235008-480-0.png';
const outputPath = path.join(assetsDir, 'logo.png');

const file = fs.createWriteStream(outputPath);
https.get(logoUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Logo downloaded successfully to', outputPath);
    
    // Update app.json with the new logo path
    const appJsonPath = path.join(__dirname, '../app.json');
    const appJson = require(appJsonPath);
    
    // Update icon and splash configurations
    appJson.expo.icon = './assets/logo.png';
    appJson.expo.splash = {
      image: './assets/logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    };
    
    fs.writeFileSync(
      appJsonPath,
      JSON.stringify(appJson, null, 2)
    );
    
    console.log('app.json updated successfully');
  });
}).on('error', (err) => {
  fs.unlink(outputPath, () => {}); // Delete the file if there's an error
  console.error('Error downloading the logo:', err);
});
