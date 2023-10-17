import { ComputeData } from '@site/src/types/IJS';
import { Dispatch, useCallback } from 'react';

import getJobManager, { JobManager } from '../../worker/jobManager';
import { ImageDemoInputOption } from '../importImage/importImageContext';

import { useDemoDispatchContext, useDemoStateContext } from './demoContext';
import { DemoAction } from './demoReducer';

export function runAndDispatch(
  demoDispatch: Dispatch<DemoAction>,
  imageOption: ImageDemoInputOption,
  name: string,
  code: string,
) {
  const jobManager = getJobManager();
  if (imageOption.type === 'url') {
    return fetch(imageOption.value)
      .then((response) => {
        return response.arrayBuffer().then((buffer) => {
          return run(
            demoDispatch,
            {
              type: 'encoded',
              imageType: imageOption.imageType,
              code,
              data: new Uint8Array(buffer),
              name,
            },
            imageOption,
            jobManager,
          );
        });
      })
      .catch((err: unknown) => {
        reportError(err);
      });
  } else if (imageOption.type === 'image') {
    const rawImage = imageOption.image.getRawImage();
    return run(
      demoDispatch,
      {
        type: 'decoded-image',
        code,
        decoded: {
          type: 'image',
          width: imageOption.image.width,
          height: imageOption.image.height,
          data: rawImage.data,
          colorModel: imageOption.image.colorModel,
          bitDepth: imageOption.image.bitDepth,
        },
        name,
      },
      imageOption,
      jobManager,
    );
  } else {
    const rawMask = imageOption.mask.getRawImage();
    return run(
      demoDispatch,
      {
        type: 'decoded-mask',
        code,
        decoded: {
          type: 'mask',
          data: rawMask.data,
          width: imageOption.mask.width,
          height: imageOption.mask.height,
        },
        name,
      },
      imageOption,
      jobManager,
    );
  }
}

function run(
  demoDispatch: Dispatch<DemoAction>,
  data: ComputeData,
  imageOption: ImageDemoInputOption,
  jobManager: JobManager,
) {
  demoDispatch({
    type: 'RUN_START',
  });
  return jobManager
    .runJob(data)
    .then((result) => {
      demoDispatch({
        type: 'RUN_SUCCESS',
        payload: {
          image: {
            sourceImage: imageOption,
            filteredImage: result.image,
          },
          time: result.time,
        },
      });
      return 'success';
    })
    .catch((err: Error) => {
      if (err.message === 'Job canceled') {
        demoDispatch({
          type: 'RUN_CANCEL',
        });
        return 'cancel';
      } else {
        demoDispatch({
          type: 'RUN_ERROR',
          payload: err,
        });
        return 'error';
      }
    });
}

export function useSelectDevice() {
  const demoDispatch = useDemoDispatchContext();
  return useCallback(
    (device: MediaDeviceInfo) => {
      demoDispatch({
        type: 'SET_SELECTED_DEVICE',
        payload: device,
      });
    },
    [demoDispatch],
  );
}

export function useSelectImage() {
  const dispatch = useDemoDispatchContext();
  const { name, code } = useDemoStateContext();

  return useCallback(
    (imageOption: ImageDemoInputOption) => {
      dispatch({
        type: 'SET_SELECTED_IMAGE',
        payload: imageOption,
      });

      void runAndDispatch(dispatch, imageOption, name, code);
    },
    [dispatch, name, code],
  );
}

export function useRunCode() {
  const dispatch = useDemoDispatchContext();
  const { name, selectedImage } = useDemoStateContext();

  const runCode = useCallback(
    (code: string) => {
      dispatch({
        type: 'SET_CODE',
        payload: code,
      });
      if (selectedImage) {
        // if a device is selected, the run happens automatically on every new frame
        void runAndDispatch(dispatch, selectedImage, name, code);
      }
    },
    [name, selectedImage, dispatch],
  );

  const stopCode = useCallback(() => {
    const jobManager = getJobManager();
    jobManager.abortJob(name);
  }, [name]);

  return {
    runCode,
    stopCode,
  };
}
