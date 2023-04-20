import { Image } from 'image-js';
import React, { useState } from 'react';

import { useVideoTransform } from '../camera/cameraContext';

import { ExpandableImages } from './ExpandableImages';

export default function ExpandableVideoDuo({
  selectedDevice,
  processImage,
}: {
  selectedDevice: MediaDeviceInfo;
  processImage: (img: Image) => Image;
}) {
  const [images, setImages] = useState<Image[]>([]);
  const { videoRef, canvasInputRef } = useVideoTransform(
    selectedDevice,
    processImage,
    (inputImage, outputImage) => setImages([inputImage, outputImage]),
  );

  return (
    <>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasInputRef} style={{ display: 'none' }} />
      {images.length === 0 ? (
        <>
          <img
            src="/img/video-placeholder.png"
            alt="placeholder"
            height="256"
            width="256"
            style={{ objectFit: 'cover' }}
          />
          <img
            src="/img/video-placeholder.png"
            alt="placeholder"
            height="256"
            width="256"
            style={{ objectFit: 'cover' }}
          />
        </>
      ) : (
        <ExpandableImages images={images} />
      )}
    </>
  );
}
