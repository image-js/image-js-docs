import React from 'react';
import greyFilter from './blur.filter';
import ImageFilter from './ImageFilter';

export default function GreyFilter() {
  return <ImageFilter processImage={greyFilter} />;
}
