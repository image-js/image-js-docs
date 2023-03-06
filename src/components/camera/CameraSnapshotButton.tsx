import { Image, readCanvas } from 'image-js';
import React, { RefObject } from 'react';

interface CameraSnapshotButtonProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  onSnapshot: (image: Image) => void;
  disabled?: boolean;
}

export default function CameraSnapshotButton(props: CameraSnapshotButtonProps) {
  const { videoRef, onSnapshot, canvasRef, disabled } = props;
  function handleClick() {
    if (videoRef.current) {
      const canvasInput = canvasRef.current as HTMLCanvasElement;
      const video = videoRef.current as HTMLVideoElement;

      canvasInput.height = video.videoHeight;
      canvasInput.width = video.videoWidth;
      const inputContext = canvasInput.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      inputContext.drawImage(video, 0, 0);
      const image = readCanvas(canvasInput);
      // const srcObject = videoRef.current.srcObject as MediaStream;
      onSnapshot(image);
      // srcObject.getVideoTracks().forEach((track) => {
      //   track.stop();
      // });
    }
  }
  return (
    <div>
      <button type="button" onClick={handleClick} disabled={disabled}>
        Take snapshot
      </button>
    </div>
  );
}
