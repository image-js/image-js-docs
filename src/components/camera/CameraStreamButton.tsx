import React, { useState } from 'react';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { iconStyle } from '../styles/icon';

export default function CameraStreamButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      title="Stream from camera"
      style={{ height: '1em' }}
      onClick={() => setIsOpen(true)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      }}
    >
      <HiOutlineVideoCamera style={iconStyle} />
    </button>
  );
}
