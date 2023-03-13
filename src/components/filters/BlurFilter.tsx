import React from 'react';
import greyFilter from './blur.filter';
import ImageFilter from './ImageFilter';

const code = 'image.gaussianBlur({ sigma: 2 });';

export default function BlurFilter() {
  // TODO: hideCode prop?
  return <ImageFilter processImage={greyFilter} code={code} />;
}
