import React, { useEffect } from 'react';
import { rowStyle } from '../styles/flex';
import { useCameraContext } from './cameraContext';

export default function CameraSelector() {
  const {
    cameraState: { cameras, selectedCamera, devicesHandled },
    dispatch,
    handleDevices,
  } = useCameraContext();

  useEffect(() => {
    if (!devicesHandled) {
      handleDevices();
    }
  }, [devicesHandled]);
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
        value={selectedCamera?.device.label}
        onChange={(event) => {
          const device = cameras.find(
            (cam) => cam.label === event.currentTarget.value,
          );
          if (device) {
            dispatch({
              type: 'SELECT_CAMERA',
              camera: { device },
            });
          }
        }}
      >
        {cameras.map((camera) => (
          <option key={camera.deviceId}>{camera.label}</option>
        ))}
      </select>
    </div>
  );
}
