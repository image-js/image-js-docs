import React, { ReactNode, useMemo, useReducer } from 'react';

import {
  FilterImageOption,
  UrlOption,
  imageContext,
} from './importImageContext';

const defaultImages: UrlOption[] = [
  { type: 'url', value: '/img/standard/Lenna.png', label: 'Lenna' },
  { type: 'url', value: '/img/standard/barbara.jpg', label: 'Barbara' },
  { type: 'url', value: '/img/standard/boat.png', label: 'Standard boat' },
  { type: 'url', value: '/img/standard/cameraman.png', label: 'Cameraman' },
  { type: 'url', value: '/img/standard/mandrill.png', label: 'Mandrill' },
  { type: 'url', value: '/img/standard/peppers.png', label: 'Peppers' },
  { type: 'url', value: '/img/standard/house.png', label: 'House' },
];

export function ImportImageProvider(props: { children: ReactNode }) {
  const [images, addImages] = useReducer(
    (state: FilterImageOption[], newOptions: FilterImageOption[]) => {
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
