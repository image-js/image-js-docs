import React, { useEffect } from 'react';

import { ImageDemoInputOption } from '../../contexts/importImage/importImageContext';
import {
  useImageRunDispatch,
  useImageRunState,
} from '../../contexts/run/imageRunContext';
import runAndDispatch from '../../contexts/run/runAndDispatch';

import { ExpandableImages, ImageSrc } from './ExpandableImages';

export default function ExpandableImageDuo({
  selectedImage,
  code,
  name,
}: {
  selectedImage: ImageDemoInputOption;
  code: string;
  name: string;
}) {
  const runState = useImageRunState();
  const runDispatch = useImageRunDispatch();

  const { sourceImage, filteredImage } = runState.image || {};

  useEffect(() => {
    if (!selectedImage) {
      return;
    }
    let imageOption = selectedImage;
    if (imageOption.type === 'url') {
      fetch(imageOption.value)
        .then((response) => {
          return response.arrayBuffer().then((buffer) => {
            void runAndDispatch(
              runDispatch,
              {
                type: 'encoded',
                code,
                data: new Uint8Array(buffer),
                name,
              },
              imageOption,
            );
          });
        })
        .catch((err: any) => {
          reportError(err);
        });
    } else {
      const rawImage = imageOption.image.getRawImage();
      void runAndDispatch(
        runDispatch,
        {
          type: 'decoded',
          code,
          image: {
            width: imageOption.image.width,
            height: imageOption.image.height,
            data: rawImage.data,
            colorModel: imageOption.image.colorModel,
            depth: rawImage.depth,
          },
          name,
        },
        imageOption,
      );
    }
  }, [selectedImage, code, name, runDispatch]);

  if (filteredImage && sourceImage) {
    const expandableImages: ImageSrc[] = [];
    if (sourceImage.type === 'url') {
      expandableImages.push(sourceImage.value);
    } else {
      expandableImages.push(sourceImage.image);
    }
    expandableImages.push(filteredImage);

    return (
      <ExpandableImages images={expandableImages} status={runState.status} />
    );
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
