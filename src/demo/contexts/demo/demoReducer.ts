import { assertUnreachable } from '@site/src/utils/assert';
import { produce } from 'immer';
import { useReducer } from 'react';

import { Addon } from '../../utils/types';
import { ImageDemoInputOption } from '../importImage/importImageContext';

import { defaultImages } from './defaultImages';

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
      type: 'SET_NO_AUTO_RUN';
      payload: boolean;
    };

export interface DemoState {
  selectedImage: ImageDemoInputOption;
  selectedDevice: MediaDeviceInfo | null;
  addon: Addon | null;
  code: string;
  noAutoRun: boolean;
}

function getInitialState(initial: DemoInitialConfig): DemoState {
  return {
    selectedImage: defaultImages[0],
    selectedDevice: null,
    addon: null,
    code: initial.initialCode,
    noAutoRun: initial.noAutoRun || false,
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
        break;
      }
      case 'SET_ADDON': {
        draft.addon = action.payload;
        break;
      }
      case 'SET_CODE': {
        draft.code = action.payload;
        break;
      }
      case 'SET_NO_AUTO_RUN': {
        draft.noAutoRun = action.payload;
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
  noAutoRun?: boolean;
}

export function useDemoReducer(initial: DemoInitialConfig) {
  const initialState = getInitialState(initial);
  return useReducer(demoReducer, initialState);
}
