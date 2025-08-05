import { useFilteredDemoImages } from '@site/src/demo/contexts/demo/demoContext';
import type { Image } from 'image-js';
import { readCanvas } from 'image-js';
import React, { useRef, useState } from 'react';
import { useKbs } from 'react-kbs';

import CameraFeed from '../../../components/camera/CameraFeed';
import CameraSelector from '../../../components/camera/CameraSelector';
import CameraSnapshotButton from '../../../components/camera/CameraSnapshotButton';
import Input from '../../../components/form/Input';
import { useLockBodyScroll } from '../../../hooks/useBodyScrollLock';

export interface Snapshot {
  image: Image;
  name: string;
}

export default function CameraSnapshotModal(props: {
  close: () => void;
  onSnapshot: (snapshot: Snapshot) => void;
}) {
  const images = useFilteredDemoImages();
  const shortcutProps = useKbs([
    {
      handler: () => props.close(),
      shortcut: 'Escape',
    },
  ]);
  const currentCount = Math.max(
    ...images.map((image) => {
      const reg = /^Snapshot #(?<version>\d+)$/.exec(image.value);
      if (reg?.groups) {
        return +reg.groups.version;
      }
      return 0;
    }),
  );
  const defaultName = `Snapshot #${currentCount + 1}`;
  const [snapshotName, setSnapshotName] = useState(defaultName);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLockBodyScroll();
  return (
    <div
      onClick={() => props.close()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'fixed',
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
          onSnapshot={() => {
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
              props.close();
              props.onSnapshot({
                image,
                name: snapshotName,
              });
            }
          }}
          disabled={!snapshotName}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
