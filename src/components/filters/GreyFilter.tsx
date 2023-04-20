import React from 'react';

import ImageFilter from './ImageFilter';
import greyFilter from './grey.filter';

const code = 'image.grey();';

const editorCode = `
import * as IJS from 'image-js';
/**
 * Process the image
 * @param { IJS.Image } image the input image
 * @returns { IJS.Image } the processed image
 */
export function process(image) {
    return image.grey();
}`;

export default function GreyFilter() {
  return (
    <ImageFilter
      processImage={greyFilter}
      code={code}
      defaultEditorCode={editorCode}
    />
  );
}
