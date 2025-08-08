import { assertUnreachable } from '@site/src/utils/assert';
import type { Image, Mask } from 'image-js';
import type { WritableDraft } from 'immer';
import { produce } from 'immer';
import { useReducer } from 'react';

import type { Addon } from '../../utils/types';
import type { ImageDemoInputOption } from '../importImage/importImageContext';

export type DemoAction =
  | {
      type: 'SET_SELECTED_DEVICE';
      payload: MediaDeviceInfo | null;
    }
  | {
      type: 'SET_SELECTED_IMAGE';
      payload: ImageDemoInputOption;
    }
  | {
      type: 'SET_ADDON';
      payload: Addon;
    }
  | {
      type: 'SET_CODE';
      payload: string;
    }
  | {
      type: 'TOGGLE_NO_AUTO_RUN';
    }
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
      payload: unknown;
    };

interface ImageData {
  /**
   * Currently shown source image.
   */
  sourceImage: ImageDemoInputOption;
  /**
   * Image after running the code on source image
   */
  filteredImage: Image | Mask;
}

export interface RunState {
  status: RunStatus;
  time: number;
  error: unknown | null;
  image: ImageData | null;
  startedCount: number;
  // Remember the state of the previous run in case the current run is canceled
  previous: {
    status: Exclude<RunStatus, 'running'>;
    error: unknown | null;
    image: ImageData | null;
  } | null;
  runTimes: number[];
  runTimeSum: number;
  meanTime: number;
  isApproximate: boolean;
}
export interface DemoState {
  selectedImage: ImageDemoInputOption | null;
  selectedDevice: MediaDeviceInfo | null;
  addon: Addon | null;
  name: string;
  code: string;
  noAutoRun: boolean;
  isMask: boolean;
  run: RunState;
}

function getInitialState(initial: DemoInitialConfig): DemoState {
  return {
    selectedImage: null,
    selectedDevice: null,
    addon: 'code',
    code: initial.initialCode,
    noAutoRun: initial.noAutoRun || false,
    name: initial.name,
    isMask: initial.isMask || false,
    run: {
      status: 'success',
      error: null,
      image: null,
      time: 0,
      startedCount: 0,
      previous: null,
      runTimes: [],
      runTimeSum: 0,
      meanTime: 0,
      isApproximate: false,
    },
  };
}

export const demoReducer = (state: DemoState, action: DemoAction) => {
  return produce(state, (draft) => {
    const type = action.type;
    switch (type) {
      case 'SET_SELECTED_IMAGE': {
        draft.selectedImage = action.payload;
        draft.selectedDevice = null;
        break;
      }
      case 'SET_SELECTED_DEVICE': {
        draft.selectedDevice = action.payload;
        draft.selectedImage = null;
        break;
      }
      case 'SET_ADDON': {
        draft.addon = action.payload;
        break;
      }
      case 'SET_CODE': {
        draft.code = action.payload;
        draft.run.isApproximate = false;
        break;
      }
      case 'TOGGLE_NO_AUTO_RUN': {
        draft.noAutoRun = !draft.noAutoRun;
        break;
      }
      case 'RUN_START': {
        const run = draft.run;
        if (run.status !== 'running') {
          run.previous = {
            status: run.status,
            error: run.error,
            image: run.image,
          };
        }
        run.status = 'running';
        run.startedCount++;

        updateStats(draft);
        break;
      }
      case 'RUN_CANCEL': {
        const run = draft.run;
        run.startedCount--;
        if (run.previous && run.startedCount === 0) {
          run.status = run.previous.status;
          run.error = run.previous.error;
          run.image = run.previous.image;
          run.previous = null;
        }
        updateStats(draft);
        break;
      }
      case 'RUN_SUCCESS': {
        const run = draft.run;
        run.image = action.payload.image;
        // if perf is sub-milisecond, some browsers will report 0
        // In this case, we set it to 1ms to prevent division by 0
        if (action.payload.time === 0) {
          run.isApproximate = true;
          run.time = 1;
        } else {
          run.time = action.payload.time;
        }
        run.startedCount--;
        run.status = run.startedCount === 0 ? 'success' : 'running';
        updateStats(draft);
        break;
      }
      case 'RUN_ERROR': {
        const run = draft.run;
        run.error = action.payload;
        run.startedCount--;
        run.status = run.startedCount === 0 ? 'error' : 'running';
        updateStats(draft);
        break;
      }
      default: {
        assertUnreachable(type);
      }
    }
    return draft;
  });
};

export interface DemoInitialConfig {
  initialCode: string;
  name: string;
  noAutoRun?: boolean;
  isMask?: boolean;
}

export function useDemoReducer(initial: DemoInitialConfig) {
  const initialState = getInitialState(initial);
  return useReducer(demoReducer, initialState);
}

export type RunStatus = 'running' | 'success' | 'error';

function updateStats(draft: WritableDraft<DemoState>) {
  const run = draft.run;
  if (run.startedCount === 0 && run.status === 'success') {
    run.runTimeSum += run.time;
    if (run.runTimeSum > 1000) {
      while (run.runTimeSum >= 1000) {
        const first = run.runTimes.shift();
        if (!first) {
          break;
        }
        run.runTimeSum -= first;
      }
    }
    run.runTimes.push(run.time);
    run.meanTime = run.runTimeSum / run.runTimes.length;
  }
}
