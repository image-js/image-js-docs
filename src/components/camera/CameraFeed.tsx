import React, { RefObject } from 'react';

import UnavailableCamera from './UnavailableCamera';
import { useCameraContext, useVideoStream } from './cameraContext';


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
        style={{
          height: 360,
          width: 640,
          backgroundColor: '#eee',
          borderRadius: 8,
          objectFit: 'contain',
          objectPosition: '50% 50%',
        }}
        ref={videoRef}
      />
    </>
  );
}
