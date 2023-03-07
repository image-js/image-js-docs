import React from 'react';
import { rowStyle } from '../styles/flex';
import { useCameraContext } from './cameraContext';

export default function CameraSelector() {
  const {
    cameraState: { cameras, selectedCamera },
    dispatch,
  } = useCameraContext();

  if (cameras.length === 0) return null;
  return (
    <div style={rowStyle}>
      <label
        htmlFor="camera"
        className="block text-sm font-medium text-gray-700"
      >
        Camera
      </label>
      <select
        id="camera"
        name="camera"
        value={getCameraValue(selectedCamera?.device)}
        onChange={(event) => {
          if (event.target.value === 'none') {
            dispatch({
              type: 'SELECT_CAMERA',
              camera: null,
            });
            return;
          }
          const device = cameras.find((cam) => {
            if (cam.deviceId) {
              return cam.deviceId === event.target.value;
            } else {
              return cam.groupId === event.target.value;
            }
          });
          if (device) {
            dispatch({
              type: 'SELECT_CAMERA',
              camera: { device },
            });
          }
        }}
      >
        <option key="none" value="none" disabled />
        {cameras.map((camera, idx) => (
          <option key={getCameraValue(camera)} value={getCameraValue(camera)}>
            {getCameraLabel(camera, idx)}
          </option>
        ))}
      </select>
    </div>
  );
}

function getCameraLabel(camera: MediaDeviceInfo, idx: number) {
  if (!camera) {
    return 'None';
  }
  if (camera.label) {
    return camera.label;
  } else {
    return `Camera ${idx + 1}`;
  }
}
function getCameraValue(camera: MediaDeviceInfo | null | undefined) {
  if (!camera) return 'none';
  return camera.deviceId || camera.groupId;
}
