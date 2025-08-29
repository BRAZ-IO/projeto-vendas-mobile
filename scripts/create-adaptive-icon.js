const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '../assets');
const outputPath = path.join(assetsDir, 'adaptive-icon.png');
const logoPath = path.join(assetsDir, 'logo.png');

// Create a canvas for the adaptive icon (1024x1024)
const canvas = createCanvas(1024, 1024);
const ctx = canvas.getContext('2d');

// Load the logo
loadImage(logoPath).then((logo) => {
  // Fill background with white
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1024, 1024);

  // Calculate dimensions to maintain aspect ratio
  const padding = 200; // Padding around the logo
  const maxWidth = 1024 - (padding * 2);
  const maxHeight = 1024 - (padding * 2);
  
  let width = logo.width;
  let height = logo.height;

  // Resize logo to fit within max dimensions while maintaining aspect ratio
  if (width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height = height * ratio;
  }
  if (height > maxHeight) {
    const ratio = maxHeight / height;
    height = maxHeight;
    width = width * ratio;
  }

  // Center the logo
  const x = (1024 - width) / 2;
  const y = (1024 - height) / 2;

  // Draw the logo
  ctx.drawImage(logo, x, y, width, height);

  // Save the result
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('Adaptive icon created at', outputPath));
}).catch(err => {
  console.error('Error creating adaptive icon:', err);
});
