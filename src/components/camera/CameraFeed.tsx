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
    const constraints: MediaStreamConstraints = {
      video: {
        groupId: selectedCamera.device.groupId
          ? {
              exact: selectedCamera.device.groupId,
            }
          : undefined,
        deviceId: selectedCamera.device.deviceId
          ? {
              exact: selectedCamera.device.deviceId,
            }
          : undefined,

        height: { ideal: 1080, min: 480, max: 1080 },
        width: { ideal: 1920 },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
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
