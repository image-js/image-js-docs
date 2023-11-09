import React, { ReactNode, useMemo, useReducer } from 'react';

import { defaultImages, defaultMasks } from '../../contexts/demo/defaultImages';
import {
  imageContext,
  ImageDemoInputOption,
} from '../../contexts/importImage/importImageContext';

export function ImportImageProvider(props: { children: ReactNode }) {
  const [options, addOptions] = useReducer(
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
      return [...state, ...newOptions];
    },
    [...defaultImages, ...defaultMasks],
  );

  const [isVideoStreamAllowed, allowVideoStream] = useReducer(
    () => true,
    false,
  );

  const contextValue = useMemo(() => {
    return {
      options,
      addOptions,
      isVideoStreamAllowed,
      allowVideoStream,
    };
  }, [options, addOptions, isVideoStreamAllowed, allowVideoStream]);

  return (
    <imageContext.Provider value={contextValue}>
      {props.children}
    </imageContext.Provider>
  );
}
