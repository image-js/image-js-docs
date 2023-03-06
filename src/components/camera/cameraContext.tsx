import { produce } from 'immer';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

interface Camera {
  device: MediaDeviceInfo;
}

interface CameraState {
  cameras: MediaDeviceInfo[];
  selectedCamera: Camera | null;
  devicesHandled: boolean;
}

const defaultCameraState: CameraState = {
  cameras: [],
  selectedCamera: null,
  devicesHandled: false,
};

type CameraContext = {
  cameraState: CameraState;
  dispatch: Dispatch<CameraAction>;
  handleDevices: () => void;
};

const cameraContext = createContext<CameraContext>({
  cameraState: defaultCameraState,
  dispatch: () => {
    // Empty
  },
  handleDevices: () => {
    // Empty
  },
});

export function useCameraContext(): CameraContext {
  return useContext(cameraContext);
}

type CameraAction =
  | {
      type: 'SET_CAMERAS';
      cameras: MediaDeviceInfo[];
      firstCamera: Camera;
    }
  | {
      type: 'SELECT_CAMERA';
      camera: Camera | null;
    }
  | {
      type: 'HANDLE_DEVICES';
    };

const cameraStateReducer = produce(
  (state: CameraState, action: CameraAction) => {
    const selectedCamera = state.selectedCamera;
    switch (action.type) {
      case 'SET_CAMERAS': {
        state.cameras = action.cameras;
        if (action.cameras.length === 0) {
          state.selectedCamera = null;
        } else if (selectedCamera === null) {
          state.selectedCamera = action.firstCamera;
        } else if (
          !state.cameras.find((camera) =>
            isSameCamera(camera, selectedCamera.device),
          )
        ) {
          // The selected camera disappeared. Use another one.
          state.selectedCamera = action.firstCamera;
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
      case 'HANDLE_DEVICES':
        state.devicesHandled = true;
        break;
      default:
        throw new Error('unknown action');
    }
  },
);

export function isSameCamera(
  cameraA: MediaDeviceInfo,
  cameraB: MediaDeviceInfo,
) {
  if (cameraA.deviceId && cameraB.deviceId) {
    return cameraA.deviceId === cameraB.deviceId;
  }
  if (cameraA.groupId && cameraB.groupId) {
    return cameraA.groupId === cameraB.groupId;
  }
  return false;
}

export function CameraProvider(props: { children: ReactNode }) {
  const [cameraState, dispatch] = useReducer(
    cameraStateReducer,
    defaultCameraState,
  );

  const handleDevices = useCallback(() => {
    dispatch({ type: 'HANDLE_DEVICES' });
    async function getCameras() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      if (cameras.length > 0) {
        dispatch({
          type: 'SET_CAMERAS',
          cameras,
          firstCamera: { device: cameras[0] },
        });
      }
    }

    function handleDeviceChange() {
      getCameras().catch(console.error);
    }

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    handleDeviceChange();
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
      handleDevices,
    }),
    [cameraState],
  );

  return (
    <cameraContext.Provider value={value}>
      {props.children}
    </cameraContext.Provider>
  );
}
