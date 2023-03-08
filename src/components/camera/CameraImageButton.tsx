import { Image } from 'image-js';
import React, { useRef, useState } from 'react';
import { HiOutlineCamera } from 'react-icons/hi2';
import { useKbs } from 'react-kbs';
import { useImportImageProvider } from '../filters/ImportImage';
import Input from '../form/Input';
import { iconStyle } from '../styles/icon';
import { useOnOff } from '../utils/useOnOff';

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
  const [isOpen, open, close] = useOnOff(false);
  const shortcut = useKbs([
    {
      handler: () => open(),
      shortcut: 'Escape',
    },
  ]);
  return (
    <>
      <button
        style={{ height: '1em' }}
        onClick={open}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            close();
          }
        }}
      >
        <HiOutlineCamera style={iconStyle} />
      </button>
      {isOpen && <CameraSnapshotModal close={close} onSnapshot={onSnapshot} />}
    </>
  );
}

function CameraSnapshotModal(props: {
  close: () => void;
  onSnapshot: (snapshot: Snapshot) => void;
}) {
  const { images } = useImportImageProvider();
  const shortcutProps = useKbs([
    {
      handler: () => props.close(),
      shortcut: 'Escape',
    },
  ]);
  const currentCount = Math.max(
    ...images.map((image) => {
      const reg = /^Snapshot #(\d+)$/.exec(image.value);
      if (reg) {
        return +reg[1];
      }
      return 0;
    }),
  );
  const defaultName = `Snapshot #${currentCount + 1}`;
  const [snapshotName, setSnapshotName] = useState(defaultName);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div
      onClick={() => props.close()}
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
        {...shortcutProps}
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
            props.close();
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
