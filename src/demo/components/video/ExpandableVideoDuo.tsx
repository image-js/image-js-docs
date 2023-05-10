import React, { useMemo } from 'react';

import { useDemoStateContext } from '../../contexts/demo/demoContext';
import { useVideoTransform } from '../../hooks/useVideoTransform';
import { ExpandableImages } from '../image/ExpandableImages';

export default function ExpandableVideoDuo({
  selectedDevice,
}: {
  selectedDevice: MediaDeviceInfo;
}) {
  const { run, code, name } = useDemoStateContext();
  const { videoRef, canvasInputRef } = useVideoTransform(
    selectedDevice,
    name,
    code,
  );

  const images = useMemo(() => {
    if (!run.image) {
      return null;
    }
    if (run.image.sourceImage.type !== 'image') {
      return null;
    }
    return [run.image.sourceImage.image, run.image.filteredImage];
  }, [run.image]);

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
