import React from 'react';

import ImageFilter from './ImageFilter';
import greyFilter from './blur.filter';

const code = 'image.gaussianBlur({ sigma: 2 });';

export default function BlurFilter() {
  return <ImageFilter processImage={greyFilter} code={code} hideCode />;
}
