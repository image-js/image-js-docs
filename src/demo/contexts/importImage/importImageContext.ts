import { Image, Mask } from 'image-js';
import { createContext, DispatchWithoutAction, useContext } from 'react';

export type UrlOption = {
  type: 'url';
  imageType: 'image' | 'mask';
  value: string;
  label: string;
};

export interface ImageOption {
  type: 'image';
  value: string;
  image: Image;
}

export interface MaskOption {
  type: 'mask';
  value: string;
  mask: Mask;
}

export type ImageDemoInputOption = UrlOption | ImageOption | MaskOption;

export interface ImportImageContext {
  options: ImageDemoInputOption[];
  addOptions: (options: ImageDemoInputOption[]) => void;
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
