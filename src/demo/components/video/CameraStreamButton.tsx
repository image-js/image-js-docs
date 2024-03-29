import { useDebounce } from '@site/src/hooks/useDebounce';
import React, { useRef } from 'react';
import { HiOutlineVideoCamera } from 'react-icons/hi2';

import {
  useCameraContext,
  useVideoStream,
} from '../../../components/camera/cameraContext';
import { useImportImageContext } from '../../contexts/importImage/importImageContext';

export default function CameraStreamButton() {
  const {
    cameraState: { selectedCamera },
  } = useCameraContext();
  const { isVideoStreamAllowed, allowVideoStream } = useImportImageContext();

  const debouncedIsVideoStreamAllowed = useDebounce(isVideoStreamAllowed, 5000);

  if (selectedCamera === undefined || !isVideoStreamAllowed) {
    return (
      <>
        <button
          type="button"
          title="Stream from camera"
          className="toolbar-button-icon"
          onClick={allowVideoStream}
          disabled={isVideoStreamAllowed}
        >
          <HiOutlineVideoCamera />
        </button>
        {isVideoStreamAllowed && <HiddenVideoStream />}
      </>
    );
  }
  if (isVideoStreamAllowed !== debouncedIsVideoStreamAllowed) {
    return <div style={{ fontSize: '0.875em' }}>Video sources added</div>;
  }
  return null;
}

function HiddenVideoStream() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoStream(videoRef);
  return <video ref={videoRef} style={{ display: 'none' }} />;
}
