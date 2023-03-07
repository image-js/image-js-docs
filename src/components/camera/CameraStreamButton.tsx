import React, { useRef } from 'react';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { useImportImageProvider } from '../filters/ImportImage';
import { iconStyle } from '../styles/icon';
import { useDebounce } from '../utils/useDebounce';
import { useCameraContext, useVideoStream } from './cameraContext';

export default function CameraStreamButton() {
  const {
    cameraState: { selectedCamera },
  } = useCameraContext();
  const { isVideoStreamAllowed, allowVideoStream } = useImportImageProvider();

  const debouncedIsVideoStreamAllowed = useDebounce(isVideoStreamAllowed, 5000);

  if (selectedCamera === undefined) {
    return (
      <>
        <button
          title="Stream from camera"
          style={{ height: '1em' }}
          onClick={allowVideoStream}
          disabled={isVideoStreamAllowed}
        >
          <HiOutlineVideoCamera style={iconStyle} />
        </button>
        {isVideoStreamAllowed && <HiddenVideoStream />}
      </>
    );
  }
  if (isVideoStreamAllowed !== debouncedIsVideoStreamAllowed) {
    return (
      <span style={{ fontSize: '0.875em' }}>Video stream sources added</span>
    );
  }
  return null;
}

function HiddenVideoStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoStream(videoRef);
  return <video ref={videoRef} style={{ display: 'none' }} />;
}
