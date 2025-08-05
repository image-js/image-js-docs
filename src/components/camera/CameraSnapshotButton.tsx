import { Image, readCanvas } from 'image-js';
import React, { RefObject } from 'react';

interface CameraSnapshotButtonProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onSnapshot: (image: Image) => void;
  disabled?: boolean;
}

export default function CameraSnapshotButton(props: CameraSnapshotButtonProps) {
  const { videoRef, onSnapshot, canvasRef, disabled } = props;
  function handleClick() {
    if (videoRef.current && canvasRef.current) {
      const canvasInput = canvasRef.current;
      const video = videoRef.current;

      canvasInput.height = video.videoHeight;
      canvasInput.width = video.videoWidth;
      const inputContext = canvasInput.getContext(
        '2d',
      ) as CanvasRenderingContext2D;
      inputContext.drawImage(video, 0, 0);
      const image = readCanvas(canvasInput);
      onSnapshot(image);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="button button--primary"
      >
        Take snapshot
      </button>
    </div>
  );
}
