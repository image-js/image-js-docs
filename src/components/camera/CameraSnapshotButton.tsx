import type { MouseEventHandler } from 'react';
import React from 'react';

interface CameraSnapshotButtonProps {
  onSnapshot: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function CameraSnapshotButton(props: CameraSnapshotButtonProps) {
  const { onSnapshot, disabled } = props;
  return (
    <div>
      <button
        type="button"
        onClick={onSnapshot}
        disabled={disabled}
        className="button button--primary"
      >
        Take snapshot
      </button>
    </div>
  );
}
