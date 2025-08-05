import type { Image, Mask } from 'image-js';
import type { DispatchWithoutAction} from 'react';
import { createContext, useContext } from 'react';

export interface UrlOption {
  type: 'url';
  imageType: 'image' | 'mask';
  value: string;
  label: string;
}

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
