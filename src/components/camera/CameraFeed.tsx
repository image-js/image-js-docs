import React, { useEffect, useRef, RefObject } from 'react';
import { useCameraContext } from './cameraContext';

import UnavailableCamera from './UnavailableCamera';

export default function CameraFeed({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement>;
}) {
  const {
    cameraState: { selectedCamera },
  } = useCameraContext();
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedCamera) return;
    video.srcObject = selectedCamera.stream;
    video.onloadedmetadata = () => {
      video.play().catch(console.error);
    };
  }, [selectedCamera]);
  if (!selectedCamera) {
    return <UnavailableCamera />;
  }

  return <video ref={videoRef} />;
}
