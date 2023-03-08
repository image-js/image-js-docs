import React from 'react';
import {
  findCameraById,
  getCameraId,
  getCameraLabel,
  useCameraContext,
} from './cameraContext';

export default function CameraSelector() {
  const {
    cameraState: { cameras, selectedCamera },
    dispatch,
  } = useCameraContext();

  if (cameras.length === 0) return null;
  return (
    <div className="flex-row">
      <label
        htmlFor="camera"
        className="block text-sm font-medium text-gray-700"
      >
        Camera
      </label>
      <select
        id="camera"
        name="camera"
        value={getCameraId(selectedCamera)}
        onChange={(event) => {
          if (event.target.value === 'none') {
            dispatch({
              type: 'SELECT_CAMERA',
              camera: null,
            });
            return;
          }
          const device = findCameraById(cameras, event.target.value);

          if (device) {
            dispatch({
              type: 'SELECT_CAMERA',
              camera: device,
            });
          }
        }}
      >
        <option key="none" value="none" disabled />
        {cameras.map((camera, idx) => (
          <option key={getCameraId(camera)} value={getCameraId(camera)}>
            {getCameraLabel(camera, idx)}
          </option>
        ))}
      </select>
    </div>
  );
}
