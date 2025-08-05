import type {
  Dispatch,
  RefObject} from 'react';
import {
  createContext,
  useContext,
  useEffect,
} from 'react';

export interface CameraState {
  cameras: MediaDeviceInfo[];
  selectedCamera: MediaDeviceInfo | null | undefined;
}

export const defaultCameraState: CameraState = {
  cameras: [],
  selectedCamera: undefined,
};

export type CameraAction =
  | {
      type: 'SET_CAMERAS';
      devices: MediaDeviceInfo[];
    }
  | {
      type: 'SELECT_CAMERA';
      camera: MediaDeviceInfo | null;
    };

export interface CameraContext {
  cameraState: CameraState;
  dispatch: Dispatch<CameraAction>;
}

export const cameraContext = createContext<CameraContext>({
  cameraState: defaultCameraState,
  dispatch: () => {
    // Empty
  },
});

export function useCameraContext(): CameraContext {
  return useContext(cameraContext);
}

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

export function useVideoStream(videoRef: RefObject<HTMLVideoElement | null>) {
  const {
    cameraState: { selectedCamera },
    dispatch,
  } = useCameraContext();

  useEffect(() => {
    const abortController = new AbortController();
    let stream: MediaStream | null = null;
    abortController.signal.addEventListener('abort', () => {
      if (stream) {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    });
    const video = videoRef.current;
    if (!video) return;
    if (selectedCamera === null) return;
    // if selectedCamera is undefined, we make a first call to getUserMedia
    // after which we can get the proper list of devices

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
        if (abortController.signal.aborted) {
          mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
          return;
        }
        stream = mediaStream;
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play().catch(reportError);
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
      abortController.abort();
    };
  }, [selectedCamera, dispatch, videoRef]);
}

export function filterAndSortDevices(devices: MediaDeviceInfo[]) {
  return devices
    .filter((device) => device.kind === 'videoinput')
    .sort((a, b) => {
      const aIsIphone = a.label.includes('iPhone') ? 1 : 0;
      const bIsIphone = b.label.includes('iPhone') ? 1 : 0;
      return aIsIphone - bIsIphone;
    });
}

export function getCameraLabel(camera: MediaDeviceInfo, idx: number) {
  if (!camera) {
    return 'None';
  }
  if (camera.label) {
    return camera.label;
  } else {
    return `Camera ${idx + 1}`;
  }
}

export function getCameraId(camera: MediaDeviceInfo | null | undefined) {
  if (!camera) return 'none';
  return camera.deviceId || camera.groupId;
}

export function findCameraById(cameras: MediaDeviceInfo[], id: string) {
  return cameras.find((cam) => {
    if (cam.deviceId) {
      return cam.deviceId === id;
    } else {
      return cam.groupId === id;
    }
  });
}
