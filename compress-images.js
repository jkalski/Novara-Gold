const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Images to compress
const imagesToCompress = [
  {
    input: 'public/images/FrontLogo.png',
    output: 'public/images/FrontLogo-optimized.png', 
    quality: 85
  },
  {
    input: 'public/images/NavbarLogo.png',
    output: 'public/images/NavbarLogo-optimized.png',
    quality: 85
  },
  {
    input: 'public/images/Gold American Eagle.png',
    output: 'public/images/Gold American Eagle-optimized.png',
    quality: 85
  },
  {
    input: 'public/images/Silver American Eagle.png',
    output: 'public/images/Silver American Eagle-optimized.png',
    quality: 85
  },
  {
    input: 'public/images/Platinum Eagle.png',
    output: 'public/images/Platinum Eagle-optimized.png',
    quality: 85
  },
  {
    input: 'public/images/Palladium RMC Maple Leaf.png',
    output: 'public/images/Palladium RMC Maple Leaf-optimized.png',
    quality: 85
  },
  {
    input: 'public/images/Gold Austrian Philharmonic.png',
    output: 'public/images/Gold Austrian Philharmonic-optimized.png',
    quality: 85
  },
  {
    input: 'public/images/people1.jpg',
    output: 'public/images/people1-optimized.jpg',
    quality: 80
  },
  {
    input: 'public/images/people2.jpg',
    output: 'public/images/people2-optimized.jpg',
    quality: 80
  },
  {
    input: 'public/images/people3.jpg',
    output: 'public/images/people3-optimized.jpg',
    quality: 80
  },
  {
    input: 'public/images/goldbarsBackground.jpg',
    output: 'public/images/goldbarsBackground-optimized.jpg',
    quality: 80
  },
  {
    input: 'public/images/goldbarsbackground2.jpg',
    output: 'public/images/goldbarsbackground2-optimized.jpg',
    quality: 80
  },
  {
    input: 'public/images/goldbarsbackgorund3.jpg',
    output: 'public/images/goldbarsbackgorund3-optimized.jpg',
    quality: 80
  }
];

async function compressImages() {
  console.log('Starting image compression...');
  
  for (const image of imagesToCompress) {
    try {
      // Get original file size
      const originalStats = fs.statSync(image.input);
      const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
      
      // Compress the image
      await sharp(image.input)
        .jpeg({ quality: image.quality })
        .png({ quality: image.quality })
        .toFile(image.output);
      
      // Get compressed file size
      const compressedStats = fs.statSync(image.output);
      const compressedSize = (compressedStats.size / 1024 / 1024).toFixed(2);
      
      const savings = ((originalStats.size - compressedStats.size) / originalStats.size * 100).toFixed(1);
      
      console.log(`✓ ${path.basename(image.input)}: ${originalSize}MB → ${compressedSize}MB (${savings}% reduction)`);
      
    } catch (error) {
      console.error(`✗ Error compressing ${image.input}:`, error.message);
    }
  }
  
  console.log('\nCompression complete! Review the compressed images and replace originals if satisfied.');
}

// Run compression
compressImages().catch(console.error);
