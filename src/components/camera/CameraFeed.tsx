import React, { RefObject } from 'react';
import { useCameraContext, useVideoStream } from './cameraContext';

import UnavailableCamera from './UnavailableCamera';

export default function CameraFeed({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement>;
}) {
  const {
    cameraState: { selectedCamera },
  } = useCameraContext();

  useVideoStream(videoRef);

  return (
    <>
      {selectedCamera === null && <UnavailableCamera />}
      <video
        style={{ maxHeight: 480, display: selectedCamera ? 'block' : 'none' }}
        ref={videoRef}
      />
    </>
  );
}
