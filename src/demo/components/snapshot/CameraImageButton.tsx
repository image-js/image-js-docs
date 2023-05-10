import React from 'react';
import { HiOutlineCamera } from 'react-icons/hi2';

import { useOnOff } from '../../../hooks/useOnOff';

import CameraSnapshotModal, { Snapshot } from './CameraSnapshotModal';

export default function CameraImageButton({
  onSnapshot,
}: {
  onSnapshot: (snapshot: Snapshot) => void;
}) {
  const [isOpen, open, close] = useOnOff(false);

  return (
    <>
      <button
        type="button"
        className="toolbar-button-icon"
        onClick={open}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            close();
          }
        }}
      >
        <HiOutlineCamera />
      </button>
      {isOpen && <CameraSnapshotModal close={close} onSnapshot={onSnapshot} />}
    </>
  );
}
