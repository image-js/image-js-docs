import { decode, Image } from 'image-js';
import React, { useEffect, useState } from 'react';

import { ExpandableImages, ImageSrc } from './ExpandableImages';
import { FilterImageOption } from './importImageContext';

export default function ExpandableImageDuo({
  selectedImage,
  processImage,
}: {
  selectedImage: FilterImageOption;
  processImage: (img: Image) => Image;
}) {
  const [filteredImage, setFilteredImage] = useState<Image | null | Error>(
    null,
  );

  useEffect(() => {
    if (selectedImage.type === 'url') {
      fetch(selectedImage.value)
        .then((response) => {
          return response.arrayBuffer().then((buffer) => {
            setFilteredImage(processImage(decode(new Uint8Array(buffer))));
          });
        })
        .catch((e: Error) => {
          reportError(e);
          setFilteredImage(e);
        });
    } else {
      try {
        setFilteredImage(processImage(selectedImage.image));
      } catch (e: any) {
        reportError(e);
        setFilteredImage(e);
      }
    }
  }, [selectedImage, processImage]);

  const expandableImages: ImageSrc[] = [];
  if (filteredImage) {
    expandableImages.push(filteredImage);
  }
  if (selectedImage.type === 'url') {
    expandableImages.unshift(selectedImage.value);
  } else {
    expandableImages.unshift(selectedImage.image);
  }

  if (filteredImage) {
    return <ExpandableImages images={expandableImages} />;
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
