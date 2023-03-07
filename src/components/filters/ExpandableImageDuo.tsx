import { decode, Image } from 'image-js';
import React, { useEffect, useState } from 'react';
import { ExpandableImages, ImageSrc } from './ExpandableImages';
import { FilterImageOption } from './ImportImage';

export default function ExpandableImageDuo({
  selectedImage,
  processImage,
}: {
  selectedImage: FilterImageOption;
  processImage: (img: Image) => Image;
}) {
  const [filteredImage, setFilteredImage] = useState<Image | null>(null);

  useEffect(() => {
    if (selectedImage.type === 'url') {
      fetch(selectedImage.value).then((response) => {
        response.arrayBuffer().then((buffer) => {
          setFilteredImage(processImage(decode(new Uint8Array(buffer))));
        });
      });
    } else {
      setFilteredImage(processImage(selectedImage.image));
    }
  }, [selectedImage]);

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
        />
        <img
          src="/img/picture-placeholder.png"
          alt="placeholder"
          width="256"
          height="256"
        />
      </>
    );
  }
}
