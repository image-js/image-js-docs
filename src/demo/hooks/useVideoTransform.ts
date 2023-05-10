import { readCanvas } from 'image-js';
import { useEffect, useRef } from 'react';

import { useCameraContext } from '../../components/camera/cameraContext';
import { useDemoDispatchContext } from '../contexts/demo/demoContext';
import { runAndDispatch } from '../contexts/demo/dispatchHelpers';
import getJobManager from '../worker/jobManager';

export function useVideoTransform(
  selectedDevice: MediaDeviceInfo,
  name: string,
  code: string,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasInputRef = useRef<HTMLCanvasElement>(null);
  const { dispatch } = useCameraContext();
  const demoDispatch = useDemoDispatchContext();

  useEffect(() => {
    const jobManager = getJobManager();
    const video = videoRef.current;
    let nextFrameRequest: number;
    let stream: MediaStream | null = null;
    const abortController = new AbortController();
    abortController.signal.addEventListener('abort', () => {
      if (nextFrameRequest) {
        cancelAnimationFrame(nextFrameRequest);
      }
      jobManager.abortJob(name);
      if (stream) {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    });
    if (!video) return;
    if (selectedDevice === null) return;
    // if selectedDevice is undefined, we make a first call to getUserMedia
    // after which we can get the proper list of devices

    const constraints: MediaStreamConstraints = {
      video: {
        groupId: selectedDevice?.groupId
          ? {
              exact: selectedDevice.groupId,
            }
          : undefined,
        deviceId: selectedDevice?.deviceId
          ? {
              exact: selectedDevice.deviceId,
            }
          : undefined,

        height: { ideal: 480, min: 480, max: 720 },
        width: { ideal: 640, min: 640, max: 1280 },
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
          video
            .play()
            .then(() => {
              const canvasInput = canvasInputRef.current as HTMLCanvasElement;
              if (!canvasInput) return;
              canvasInput.height = video.videoHeight;
              canvasInput.width = video.videoWidth;
              const inputContext = canvasInput.getContext('2d', {
                willReadFrequently: true,
              }) as CanvasRenderingContext2D;
              function nextFrame() {
                if (!video) return;
                inputContext.drawImage(video, 0, 0);
                const image = readCanvas(canvasInput);

                void runAndDispatch(
                  demoDispatch,
                  {
                    type: 'image',
                    image,
                    value: name,
                  },
                  name,
                  code,
                ).then((status) => {
                  // We don't request the next fram in case of error
                  if (status === 'success') {
                    nextFrameRequest = requestAnimationFrame(nextFrame);
                  }
                });
              }
              nextFrameRequest = requestAnimationFrame(nextFrame);
            })
            .catch(reportError);
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
  }, [selectedDevice, demoDispatch, dispatch, code, name]);

  return { videoRef, canvasInputRef };
}
