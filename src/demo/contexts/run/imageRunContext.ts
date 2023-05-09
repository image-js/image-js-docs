import { Image } from 'image-js';
import { createContext, Dispatch, useContext } from 'react';

import { ImageDemoInputOption } from '../importImage/importImageContext';

import { RunAction, RunState } from './runReducer';

export interface ImageRunState {
  /**
   * Currently shown source image.
   */
  sourceImage: ImageDemoInputOption;
  /**
   * Image after running the code on source image
   */
  filteredImage: Image;
}

export const imageRunStateContext = createContext<RunState | null>(null);
export const imageRunDispatchContext =
  createContext<Dispatch<RunAction> | null>(null);

export function useImageRunState() {
  const context = useContext(imageRunStateContext);
  if (!context) {
    throw new Error('useImageRunState must be used within an ImageRunProvider');
  }
  return context;
}

export function useImageRunDispatch() {
  const context = useContext(imageRunDispatchContext);
  if (!context) {
    throw new Error(
      'useImageRunDispatch must be used within an ImageRunProvider',
    );
  }
  return context;
}
