import React, { ReactNode, useMemo, useReducer } from 'react';

import { defaultImages } from '../../contexts/demo/defaultImages';
import {
  ImageDemoInputOption,
  imageContext,
} from '../../contexts/importImage/importImageContext';

export function ImportImageProvider(props: { children: ReactNode }) {
  const [images, addImages] = useReducer(
    (state: ImageDemoInputOption[], newOptions: ImageDemoInputOption[]) => {
      newOptions.forEach((newOption) => {
        while (state.find((option) => option.value === newOption.value)) {
          if (state.find((option) => option.value === newOption.value)) {
            const reg = /.+\((?<version>\d+)\)$/.exec(newOption.value);
            if (reg?.groups) {
              const count = +reg.groups.version;
              newOption.value = newOption.value.replace(
                /\(\d+\)$/,
                `(${count + 1})`,
              );
            } else {
              newOption.value = `${newOption.value} (1)`;
            }
          }
        }
      });
      const newState = [...state, ...newOptions];
      return newState;
    },
    defaultImages,
  );

  const [isVideoStreamAllowed, allowVideoStream] = useReducer(
    () => true,
    false,
  );

  const contextValue = useMemo(() => {
    return { images, addImages, isVideoStreamAllowed, allowVideoStream };
  }, [images, addImages, isVideoStreamAllowed, allowVideoStream]);

  return (
    <imageContext.Provider value={contextValue}>
      {props.children}
    </imageContext.Provider>
  );
}
