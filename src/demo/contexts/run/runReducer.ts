import { assert, assertUnreachable } from '@site/src/utils/assert';
import { Image } from 'image-js';
import { original, produce } from 'immer';
import { useReducer } from 'react';

import { ImageDemoInputOption } from '../importImage/importImageContext';

export type RunAction =
  | {
      type: 'RUN_START';
    }
  | {
      type: 'RUN_CANCEL';
    }
  | {
      type: 'RUN_SUCCESS';
      payload: {
        image: ImageData;
        time: number;
      };
    }
  | {
      type: 'RUN_ERROR';
      payload: Error;
    };

export type RunStatus = 'running' | 'success' | 'error';

export interface ImageRunState {}

interface ImageData {
  /**
   * Currently shown source image.
   */
  sourceImage: ImageDemoInputOption;
  /**
   * Image after running the code on source image
   */
  filteredImage: Image;
}

export interface RunState {
  status: RunStatus;
  time: number;
  error: Error | null;
  image: ImageData | null;
  startedCount: number;
  previous: {
    status: Exclude<RunStatus, 'running'>;
    error: Error | null;
    image: ImageData | null;
  } | null;
  runTimes: number[];
  runTimeSum: number;
  meanTime: number;
}

const initialState: RunState = {
  status: 'success',
  error: null,
  image: null,
  time: 0,
  startedCount: 0,
  previous: null,
  runTimes: [],
  runTimeSum: 0,
  meanTime: 0,
};

export const runReducer = (state: RunState, action: RunAction) => {
  return produce(state, (draft) => {
    const type = action.type;
    switch (type) {
      case 'RUN_START': {
        draft.status = 'running';
        draft.startedCount++;
        break;
      }
      case 'RUN_CANCEL': {
        draft.startedCount--;
        if (draft.previous && draft.startedCount === 0) {
          draft.status = draft.previous.status;
          draft.error = draft.previous.error;
          draft.image = draft.previous.image;
          draft.previous = null;
        }
        break;
      }
      case 'RUN_SUCCESS': {
        draft.image = action.payload.image;
        draft.time = action.payload.time;
        draft.startedCount--;
        draft.status = draft.startedCount === 0 ? 'success' : 'running';
        break;
      }
      case 'RUN_ERROR': {
        draft.error = action.payload;
        draft.startedCount--;
        draft.status = draft.startedCount === 0 ? 'error' : 'running';

        break;
      }
      default: {
        assertUnreachable(type);
      }
    }

    if (draft.startedCount === 0 && draft.status === 'success') {
      draft.runTimeSum += draft.time;
      if (draft.runTimeSum > 1000) {
        while (draft.runTimeSum >= 1000) {
          const first = draft.runTimes.shift();
          if (!first) {
            break;
          }
          draft.runTimeSum -= first;
        }
      }
      draft.runTimes.push(draft.time);
      draft.meanTime = draft.runTimeSum / draft.runTimes.length;
    }
    return draft;
  });
};

export function useRunReducer() {
  return useReducer(runReducer, initialState);
}
