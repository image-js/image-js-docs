import { Image } from 'image-js';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { HiOutlineCamera } from 'react-icons/hi2';
import Input from '../form/Input';
import { iconStyle } from '../styles/icon';

import CameraFeed from './CameraFeed';
import CameraSelector from './CameraSelector';
import CameraSnapshotButton from './CameraSnapshotButton';

interface Snapshot {
  image: Image;
  name: string;
}

export default function CameraImageButton({
  onSnapshot,
}: {
  onSnapshot: (snapshot: Snapshot) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        style={{ height: '1em' }}
        onClick={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <HiOutlineCamera style={iconStyle} />
      </button>
      {isOpen && (
        <CameraSnapshotModal setIsOpen={setIsOpen} onSnapshot={onSnapshot} />
      )}
    </>
  );
}

function CameraSnapshotModal(props: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSnapshot: (snapshot: Snapshot) => void;
}) {
  const [snapshotName, setSnapshotName] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div
      onClick={() => props.setIsOpen(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <div
        className="filter-demo alert--note"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          alignSelf: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}
      >
        <CameraSelector />
        <Input
          name="snapshotName"
          label="Snapshot name"
          setValue={setSnapshotName}
          value={snapshotName}
        />
        <CameraFeed videoRef={videoRef} />
        <CameraSnapshotButton
          onSnapshot={(snapshot) => {
            props.setIsOpen(false);
            props.onSnapshot({
              image: snapshot,
              name: snapshotName,
            });
          }}
          videoRef={videoRef}
          canvasRef={canvasRef}
          disabled={!snapshotName}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
