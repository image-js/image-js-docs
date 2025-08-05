import type * as IJS from 'image-js';

type IJSType = typeof IJS;

export type ProcessImage = (
  image: IJS.Image | IJS.Mask,
  IJS: IJSType,
) => IJS.Image | IJS.Mask;

interface ComputeDataBase {
  name: string;
  code: string;
}
export interface EncodedComputeData extends ComputeDataBase {
  type: 'encoded';
  data: Uint8Array;
  imageType: 'image' | 'mask';
}

interface ImageData {
  type: 'image';
  data: IJS.ImageDataArray;
  width: number;
  height: number;
  bitDepth: IJS.BitDepth;
  colorModel: IJS.ImageColorModel;
}

interface MaskData {
  type: 'mask';
  data: Uint8Array;
  width: number;
  height: number;
}

export interface DecodedImageComputeData extends ComputeDataBase {
  type: 'decoded-image';
  decoded: ImageData;
}

export interface DecodedMaskComputeData extends ComputeDataBase {
  type: 'decoded-mask';
  decoded: MaskData;
}

export type ComputeData =
  | EncodedComputeData
  | DecodedImageComputeData
  | DecodedMaskComputeData;

export interface WorkerSuccessResponse {
  type: 'success';
  time: number;
  name: string;
  data: ImageData | MaskData;
}

export interface WorkerErrorResponse {
  type: 'error';
  name: string;
  error: string;
}

export type WorkerResponse = WorkerSuccessResponse | WorkerErrorResponse;
