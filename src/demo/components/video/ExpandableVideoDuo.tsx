import React, { useMemo } from 'react';

import { useImageRunState } from '../../contexts/run/imageRunContext';
import { useVideoTransform } from '../../hooks/useVideoTransform';
import { ExpandableImages } from '../image/ExpandableImages';

export default function ExpandableVideoDuo({
  selectedDevice,
  code,
  name,
}: {
  selectedDevice: MediaDeviceInfo;
  code: string;
  name: string;
}) {
  const runState = useImageRunState();
  const { videoRef, canvasInputRef } = useVideoTransform(
    selectedDevice,
    name,
    code,
  );

  const images = useMemo(() => {
    if (!runState.image) {
      return null;
    }
    if (runState.image.sourceImage.type !== 'image') {
      return null;
    }
    return [runState.image.sourceImage.image, runState.image.filteredImage];
  }, [runState.image]);

  return (
    <>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasInputRef} style={{ display: 'none' }} />
      {images === null ? (
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
        <ExpandableImages images={images} status="success" />
      )}
    </>
  );
}
