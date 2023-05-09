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

export type ImageDemoInputOption = UrlOption | ImageOption;

export interface ImportImageContext {
  images: ImageDemoInputOption[];
  addImages: (images: ImageDemoInputOption[]) => void;
  isVideoStreamAllowed: boolean;
  allowVideoStream: DispatchWithoutAction;
}

export const imageContext = createContext<ImportImageContext | null>(null);

export function useImportImageContext() {
  const context = useContext(imageContext);
  if (!context) {
    throw new Error('expected context to be defined');
  }
  return context;
}

export function isUrlOption(option: ImageDemoInputOption): option is UrlOption {
  return option.type === 'url';
}

export function isImageOption(
  option: ImageDemoInputOption,
): option is ImageOption {
  return option.type === 'image';
}
