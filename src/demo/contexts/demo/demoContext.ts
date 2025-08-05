import { useImportImageContext } from '@site/src/demo/contexts/importImage/importImageContext';
import type { Dispatch } from 'react';
import { createContext, useContext, useMemo } from 'react';

import type { DemoAction, DemoState } from './demoReducer';

export const demoStateContext = createContext<DemoState | null>(null);
export const demoDispatchContext = createContext<Dispatch<DemoAction> | null>(
  null,
);

export const useDemoStateContext = () => {
  const context = useContext(demoStateContext);
  if (!context) {
    throw new Error(
      'useDemoStateContext must be used within a ImageDemoProvider',
    );
  }
  return context;
};

export const useDemoDispatchContext = () => {
  const context = useContext(demoDispatchContext);
  if (!context) {
    throw new Error(
      'useDemoDispatchContext must be used within a ImageDemoProvider',
    );
  }
  return context;
};

export const useFilteredDemoImages = () => {
  const { isMask } = useDemoStateContext();
  const { options } = useImportImageContext();
  const images = useMemo(
    () =>
      options.filter((option) =>
        option.type === 'url'
          ? option.imageType === 'image'
          : option.type === 'image',
      ),
    [options],
  );

  const masks = useMemo(
    () =>
      options.filter((option) =>
        option.type === 'url'
          ? option.imageType === 'mask'
          : option.type === 'mask',
      ),
    [options],
  );
  if (isMask) {
    return masks;
  } else {
    return images;
  }
};
