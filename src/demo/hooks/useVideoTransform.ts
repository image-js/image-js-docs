import { readCanvas } from 'image-js';
import { useEffect, useRef } from 'react';

import { useCameraContext } from '../../components/camera/cameraContext';
import { useImageRunDispatch } from '../contexts/run/imageRunContext';
import runAndDispatch from '../contexts/run/runAndDispatch';
import getJobManager from '../worker/jobManager';

export function useVideoTransform(
  selectedDevice: MediaDeviceInfo,
  name: string,
  code: string,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasInputRef = useRef<HTMLCanvasElement>(null);
  const { dispatch } = useCameraContext();
  const runDispatch = useImageRunDispatch();

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
                const rawImage = image.getRawImage();

                void runAndDispatch(
                  runDispatch,
                  {
                    type: 'decoded',
                    code,
                    image: {
                      width: image.width,
                      height: image.height,
                      data: rawImage.data,
                      colorModel: image.colorModel,
                      depth: rawImage.depth,
                    },
                    name,
                  },
                  {
                    type: 'image',
                    image,
                    value: name,
                  },
                  jobManager,
                ).then((status) => {
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
  }, [selectedDevice, dispatch, runDispatch, code, name]);

  return { videoRef, canvasInputRef };
}
