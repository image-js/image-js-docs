import React from 'react';

import { useDemoStateContext } from '../../contexts/demo/demoContext';

import { ExpandableImages, ImageSrc } from './ExpandableImages';

export default function ExpandableImageDuo() {
  const { run } = useDemoStateContext();

  const { sourceImage, filteredImage } = run.image || {};

  if (filteredImage && sourceImage) {
    const expandableImages: ImageSrc[] = [];
    if (sourceImage.type === 'url') {
      expandableImages.push(sourceImage.value);
    } else if (sourceImage.type === 'image') {
      expandableImages.push(sourceImage.image);
    } else {
      expandableImages.push(sourceImage.mask);
    }
    expandableImages.push(filteredImage);

    return <ExpandableImages images={expandableImages} status={run.status} />;
  } else {
    return (
      <>
        <img
          src="/img/picture-placeholder.png"
          alt="placeholder"
          width="256"
          height="256"
          style={{
            objectFit: 'contain',
          }}
        />
        <img
          src="/img/picture-placeholder.png"
          alt="placeholder"
          width="256"
          height="256"
          style={{
            objectFit: 'contain',
          }}
        />
      </>
    );
  }
}
