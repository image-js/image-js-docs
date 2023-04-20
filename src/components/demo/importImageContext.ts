import { Image } from 'image-js';
import { createContext, DispatchWithoutAction, useContext } from 'react';

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

export interface ImportImageContext {
  images: FilterImageOption[];
  addImages: (images: FilterImageOption[]) => void;
  isVideoStreamAllowed: boolean;
  allowVideoStream: DispatchWithoutAction;
}

export const imageContext = createContext<ImportImageContext | null>(null);

export function useImportImageProvider() {
  const context = useContext(imageContext);
  if (!context) {
    throw new Error('expected context to be defined');
  }
  return context;
}

export function isUrlOption(option: FilterImageOption): option is UrlOption {
  return option.type === 'url';
}

export function isImageOption(
  option: FilterImageOption,
): option is ImageOption {
  return option.type === 'image';
}
