import fs from 'fs';

import { fetchURL, write } from 'image-js';

import { defaultImages, defaultMasks } from './imageDataset.mjs';

export async function imageLoader() {
  const demoImagesDir = 'demoImages';
  const staticDir = 'static';

  const imageData = { masks: [], images: [] };
  try {
    // Create static directory if it doesn't exist
    if (!fs.existsSync(`./${staticDir}/${demoImagesDir}`)) {
      fs.mkdirSync(`./${staticDir}/${demoImagesDir}`, { recursive: true });
    }

    const images = await Promise.all(
      defaultImages.map((imageDataUrl) => fetchURL(imageDataUrl.value)),
    );

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageDataUrl = defaultImages[i];
      const imageTitle = getFilename(imageDataUrl.value);
      write(`./${staticDir}/${demoImagesDir}/images/${imageTitle}`, image, {
        recursive: true,
      });
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
      write(`./${staticDir}/${demoImagesDir}/masks/${maskTitle}`, mask, {
        recursive: true,
      });
      // Keeping object structure for compatibility
      imageData.masks.push({
        type: 'url',
        imageType: 'mask',
        label: `${maskDataUrl.label} (${mask.width}x${mask.height})`,
        value: `/${demoImagesDir}/masks/${maskTitle}`,
      });
    }
    // Write data about newly created files.
    const outputPath = `./${staticDir}/${demoImagesDir}/imageData.json`;

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
