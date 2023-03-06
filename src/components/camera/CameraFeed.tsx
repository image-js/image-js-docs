import React, { useEffect, RefObject } from 'react';
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
    if (!selectedCamera || !video) return;
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          deviceId: selectedCamera.device.deviceId,
          height: { ideal: 1080, min: 480, max: 1080 },
          width: { ideal: 1920 },
        },
      })
      .then((mediaStream) => {
        stream = mediaStream;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play().catch(console.error);
        };
      })
      .catch(console.error);

    return () => {
      if (stream) {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [selectedCamera]);
  if (!selectedCamera) {
    return <UnavailableCamera />;
  }

  return <video style={{ maxHeight: 480 }} ref={videoRef} />;
}
