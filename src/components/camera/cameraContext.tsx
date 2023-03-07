import { produce } from 'immer';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface CameraState {
  cameras: MediaDeviceInfo[];
  selectedCamera: MediaDeviceInfo | null | undefined;
}

const defaultCameraState: CameraState = {
  cameras: [],
  selectedCamera: undefined,
};

type CameraContext = {
  cameraState: CameraState;
  dispatch: Dispatch<CameraAction>;
};

const cameraContext = createContext<CameraContext>({
  cameraState: defaultCameraState,
  dispatch: () => {
    // Empty
  },
});

export function useCameraContext(): CameraContext {
  return useContext(cameraContext);
}

type CameraAction =
  | {
      type: 'SET_CAMERAS';
      devices: MediaDeviceInfo[];
    }
  | {
      type: 'SELECT_CAMERA';
      camera: MediaDeviceInfo | null;
    };

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

export function useVideoStream(videoRef: React.RefObject<HTMLVideoElement>) {
  const {
    cameraState: { selectedCamera },
    dispatch,
  } = useCameraContext();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (selectedCamera === null) return;
    // if selectedCamera is undefined, we make a first call to getUserMedia
    // after which we can get the proper list of devices

    let stream: MediaStream | null = null;

    const constraints: MediaStreamConstraints = {
      video: {
        groupId: selectedCamera?.groupId
          ? {
              exact: selectedCamera.groupId,
            }
          : undefined,
        deviceId: selectedCamera?.deviceId
          ? {
              exact: selectedCamera.deviceId,
            }
          : undefined,

        height: { ideal: 1080, min: 480, max: 1080 },
        width: { ideal: 1920 },
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        stream = mediaStream;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play().catch(console.error);
        };

        return navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            dispatch({
              type: 'SET_CAMERAS',
              devices,
            });
          })
          .catch(reportError);
      })
      .catch(reportError);

    return () => {
      if (stream) {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [selectedCamera]);
}

function filterAndSortDevices(devices: MediaDeviceInfo[]) {
  return devices
    .filter((device) => device.kind === 'videoinput')
    .sort((a, b) => {
      const aIsIphone = a.label.includes('iPhone') ? 1 : 0;
      const bIsIphone = b.label.includes('iPhone') ? 1 : 0;
      return aIsIphone - bIsIphone;
    });
}
