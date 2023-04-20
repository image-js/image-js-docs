import React from 'react';

import ImageFilter from './ImageFilter';
import blurFilter from './blur.filter';

const code = 'image.gaussianBlur({ sigma: 2 });';

const editorCode = `
import * as IJS from 'image-js';
/**
 * Process the image
 * @param { IJS.Image } image the input image
 * @returns { IJS.Image } the processed image
 */
export function process(image) {
    return image.gaussianBlur({sigma: 2});
}
`;

export default function BlurFilter() {
  return (
    <ImageFilter
      processImage={blurFilter}
      code={code}
      defaultEditorCode={editorCode}
    />
  );
}
