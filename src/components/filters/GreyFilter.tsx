import React from 'react';

import ImageFilter from './ImageFilter';
import greyFilter from './grey.filter';

const code = 'image.grey();';

export default function GreyFilter() {
  return <ImageFilter processImage={greyFilter} code={code} />;
}
