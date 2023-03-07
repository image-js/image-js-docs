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

interface Camera {
  device: MediaDeviceInfo;
}

interface CameraState {
  cameras: MediaDeviceInfo[];
  selectedCamera: Camera | null | undefined;
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
      cameras: MediaDeviceInfo[];
      firstCamera: Camera;
    }
  | {
      type: 'SELECT_CAMERA';
      camera: Camera | null;
    };

const cameraStateReducer = produce(
  (state: CameraState, action: CameraAction) => {
    const selectedCamera = state.selectedCamera;
    switch (action.type) {
      case 'SET_CAMERAS': {
        state.cameras = action.cameras;
        if (action.cameras.length === 0) {
          state.selectedCamera = null;
        } else if (!selectedCamera) {
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
        groupId: selectedCamera?.device.groupId
          ? {
              exact: selectedCamera.device.groupId,
            }
          : undefined,
        deviceId: selectedCamera?.device.deviceId
          ? {
              exact: selectedCamera.device.deviceId,
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
            const cameras = devices.filter(
              (device) => device.kind === 'videoinput',
            );
            dispatch({
              type: 'SET_CAMERAS',
              cameras,
              firstCamera: { device: cameras[0] },
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
