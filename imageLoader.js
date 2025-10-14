import fs from 'fs';

import { fetchURL, write } from 'image-js';

import { defaultImages, defaultMasks } from './imageDataset.js';

export async function imageLoader() {
  const staticDir = '/demoImages/';

  const imageData = { masks: [], images: [] };
  try {
    // Create static directory if it doesn't exist
    if (!fs.existsSync(`./static${staticDir}`)) {
      fs.mkdirSync(`./static${staticDir}`, { recursive: true });
    }

    const images = await Promise.all(
      defaultImages.map((imageDataUrl) => fetchURL(imageDataUrl.value)),
    );

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageDataUrl = defaultImages[i];
      const imageTitle = imageDataUrl.value.slice(
        imageDataUrl.value.lastIndexOf('/') + 1,
      );
      write(`./static${staticDir}images/${imageTitle}`, image, {
        recursive: true,
      });

      imageData.images.push({
        type: 'url',
        imageType: 'image',
        label: `${imageDataUrl.label} (${image.width}x${image.height})`,
        value: `${staticDir}images/${imageTitle}`,
      });
    }

    // Fetch all masks in parallel
    const masks = await Promise.all(
      defaultMasks.map((maskDataUrl) => fetchURL(maskDataUrl.value)),
    );

    for (let i = 0; i < masks.length; i++) {
      const mask = masks[i];
      const maskDataUrl = defaultMasks[i];
      const maskTitle = maskDataUrl.value.slice(
        maskDataUrl.value.lastIndexOf('/') + 1,
      );
      write(`./static${staticDir}masks/${maskTitle}`, mask, {
        recursive: true,
      });
      imageData.masks.push({
        type: 'url',
        imageType: 'mask',
        label: `${maskDataUrl.label} (${mask.width}x${mask.height})`,
        value: `${staticDir}masks/${maskTitle}`,
      });
    }

    const outputPath = `./static${staticDir}imageData.json`;

    fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));
  } catch (error) {
    throw new Error(`Error in imageLoader: ${error.message}`);
  }
  // Fetch all images in parallel

  return imageData;
}
