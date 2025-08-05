import { produce } from 'immer';
import type { ReactNode} from 'react';
import React, { useEffect, useMemo, useReducer } from 'react';

import type {
  CameraAction,
  CameraContext,
  CameraState} from './cameraContext';
import {
  cameraContext,
  defaultCameraState,
  filterAndSortDevices,
  isSameCamera,
} from './cameraContext';

export function CameraProvider(props: { children: ReactNode }) {
  const [cameraState, dispatch] = useReducer(
    cameraStateReducer,
    defaultCameraState,
  );

  useEffect(() => {
    async function getCameras() {
      const devices = await navigator.mediaDevices.enumerateDevices();

      dispatch({
        type: 'SET_CAMERAS',
        devices,
      });
    }

    function handleDeviceChange() {
      getCameras().catch(reportError);
    }

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    return () =>
      navigator.mediaDevices.removeEventListener(
        'devicechange',
        handleDeviceChange,
      );
  }, []);

  const value = useMemo<CameraContext>(
    () => ({
      cameraState,
      dispatch,
    }),
    [cameraState],
  );

  return (
    <cameraContext.Provider value={value}>
      {props.children}
    </cameraContext.Provider>
  );
}

const cameraStateReducer = produce(
  (state: CameraState, action: CameraAction) => {
    const selectedCamera = state.selectedCamera;
    switch (action.type) {
      case 'SET_CAMERAS': {
        state.cameras = filterAndSortDevices(action.devices);
        if (state.cameras.length === 0) {
          state.selectedCamera = null;
        } else if (!selectedCamera) {
          state.selectedCamera = state.cameras[0];
        } else if (
          !state.cameras.find((camera) => isSameCamera(camera, selectedCamera))
        ) {
          // The selected camera disappeared. Use another one.
          state.selectedCamera = state.cameras[0];
        } else {
          // The new camera to select is already selected
          // Do nothing
        }
        break;
      }
      case 'SELECT_CAMERA': {
        state.selectedCamera = action.camera;
        break;
      }
      default:
        throw new Error('unknown action');
    }
  },
);
