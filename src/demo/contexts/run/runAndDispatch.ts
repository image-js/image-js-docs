import { ComputeData } from '@site/src/types/IJS';
import { Dispatch } from 'react';

import workerHelper from '../../worker/workerHelper';
import { ImageDemoInputOption } from '../importImage/importImageContext';

import { RunAction } from './runReducer';

export default function runAndDispatch(
  runDispatch: Dispatch<RunAction>,
  data: ComputeData,
  imageOption: ImageDemoInputOption,
) {
  runDispatch({
    type: 'RUN_START',
  });
  return workerHelper
    .runJob(data)
    .then((result) => {
      runDispatch({
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
        runDispatch({
          type: 'RUN_CANCEL',
        });
      } else {
        runDispatch({
          type: 'RUN_ERROR',
          payload: err,
        });
      }
      return 'error';
    });
}
