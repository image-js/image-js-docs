import { Image } from 'image-js';
import React, { createContext, ReactNode, useContext, useReducer } from 'react';

const defaultImages: UrlOption[] = [
  { type: 'url', value: '/img/standard/Lenna.png', label: 'Lenna' },
  { type: 'url', value: '/img/standard/barbara.jpg', label: 'Barbara' },
  { type: 'url', value: '/img/standard/boat.png', label: 'Standard boat' },
  { type: 'url', value: '/img/standard/cameraman.png', label: 'Cameraman' },
  { type: 'url', value: '/img/standard/mandrill.png', label: 'Mandrill' },
  { type: 'url', value: '/img/standard/peppers.png', label: 'Peppers' },
  { type: 'url', value: '/img/standard/house.png', label: 'House' },
];

export type UrlOption = {
  type: 'url';
  value: string;
  label: string;
};

export interface ImageOption {
  type: 'image';
  value: string;
  image: Image;
}

export type FilterImageOption = UrlOption | ImageOption;

interface ImportImageContext {
  images: FilterImageOption[];
  addImages: (images: FilterImageOption[]) => void;
}

const imageContext = createContext<ImportImageContext | null>(null);

export function useImportImageProvider() {
  const context = useContext(imageContext);
  if (!context) {
    throw new Error('expected context to be defined');
  }
  return context;
}

export function ImportImageProvider(props: { children: ReactNode }) {
  const [images, addImages] = useReducer(
    (state: FilterImageOption[], newOptions: FilterImageOption[]) => {
      newOptions.forEach((newOption) => {
        while (state.find((option) => option.value === newOption.value)) {
          if (state.find((option) => option.value === newOption.value)) {
            const reg = /.+\((\d+)\)$/.exec(newOption.value);
            if (reg) {
              const count = +reg[1];
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

  return (
    <imageContext.Provider value={{ images, addImages }}>
      {props.children}
    </imageContext.Provider>
  );
}

export function isUrlOption(option: FilterImageOption): option is UrlOption {
  return option.type === 'url';
}

export function isImageOption(
  option: FilterImageOption,
): option is ImageOption {
  return option.type === 'image';
}
