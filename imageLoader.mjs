import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { fetchURL, write } from 'image-js';

import { defaultImages, defaultMasks } from './imageDataset.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function imageLoader() {
  const demoImagesDir = 'demoImages';
  const staticDir = 'static';

  const imageData = { masks: [], images: [] };
  try {
    // Create static directory if it doesn't exist
    const staticPath = path.join(__dirname, staticDir, demoImagesDir);

    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(staticPath, { recursive: true });
    }

    const images = await Promise.all(
      defaultImages.map((imageDataUrl) => fetchURL(imageDataUrl.value)),
    );

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageDataUrl = defaultImages[i];
      const imageTitle = getFilename(imageDataUrl.value);
      const imagePath = path.join(
        __dirname,
        staticDir,
        demoImagesDir,
        'images',
        imageTitle,
      );
      write(imagePath, image, { recursive: true });
      // Keeping object structure for compatibility
      imageData.images.push({
        type: 'url',
        imageType: 'image',
        label: `${imageDataUrl.label} (${image.width}x${image.height})`,
        value: `/${demoImagesDir}/images/${imageTitle}`,
      });
    }

    const masks = await Promise.all(
      defaultMasks.map((maskDataUrl) => fetchURL(maskDataUrl.value)),
    );

    for (let i = 0; i < masks.length; i++) {
      const mask = masks[i];
      const maskDataUrl = defaultMasks[i];
      const maskTitle = getFilename(maskDataUrl.value);
      const maskPath = path.join(
        __dirname,
        staticDir,
        demoImagesDir,
        'masks',
        maskTitle,
      );
      write(maskPath, mask, { recursive: true });
      // Keeping object structure for compatibility
      imageData.masks.push({
        type: 'url',
        imageType: 'mask',
        label: `${maskDataUrl.label} (${mask.width}x${mask.height})`,
        value: `/${demoImagesDir}/masks/${maskTitle}`,
      });
    }
    // Write data about newly created files.
    const outputPath = path.join(
      __dirname,
      'src/demo/contexts/demo/imageData.json',
    );

    fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));
  } catch (error) {
    throw new Error(`Error in imageLoader: ${error.message}`);
  }

  return imageData;
}
// Returns only filename with extension.
function getFilename(filepath) {
  return filepath.replace(/^.*[\\/]/, '');
}
await imageLoader();
