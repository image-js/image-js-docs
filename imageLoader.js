const fs = require('fs');
const imageJs = require('image-js');
const { fetchURL } = require('image-js');
require('ts-node/register');
const {
  defaultImages,
  defaultMasks,
} = require('./src/demo/contexts/demo/defaultImages');

async function imageLoader(siteDir) {
  const imageData = [];
  for (let imageDataUrl of defaultImages) {
    const image = await fetchURL(imageDataUrl.value);
    const imageTitle = imageDataUrl.value.slice(
      imageDataUrl.value.lastIndexOf('/'),
    );
    imageJs.write(`./static/${imageTitle}`, image);

    imageData.push({
      type: 'image',
      label: imageDataUrl.label,
      width: image.width,
      height: image.height,
      path: path.concat(
        imageDataUrl.value.slice(imageDataUrl.value.lastIndexOf('/')),
      ),
    });
  }

  for (const maskDataUrl of defaultMasks) {
    const mask = await fetchURL(maskDataUrl.value);
    const maskTitle = maskDataUrl.value.slice(
      maskDataUrl.value.lastIndexOf('/'),
    );
    imageJs.write(`./static/${maskTitle}`, mask);
    imageData.push({
      type: 'mask',
      label: maskDataUrl.label,
      width: mask.width,
      height: mask.height,
      path: path.concat(
        maskDataUrl.value.slice(maskDataUrl.value.lastIndexOf('/')),
      ),
    });
  }

  // Use absolute path
  const outputPath = siteDir.concat('/static/imageData.json');
  fs.writeFileSync(outputPath, JSON.stringify(imageData, null, 2));

  console.log('Image data saved to:', outputPath);
  return imageData;
}

module.exports = { imageLoader };
