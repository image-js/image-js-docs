import React from 'react';
import greyFilter from './grey.filter';
import ImageFilter from './ImageFilter';

const code = 'image.grey();';

export default function GreyFilter() {
  return <ImageFilter processImage={greyFilter} code={code} />;
}
