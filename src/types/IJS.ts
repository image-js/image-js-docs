import * as IJS from 'image-js';

type IJSType = typeof IJS;

export type ProcessImage = (image: IJS.Image, IJS: IJSType) => IJS.Image;

interface ComputeDataBase {
  name: string;
  code: string;
}
export interface EncodedComputeData extends ComputeDataBase {
  type: 'encoded';
  data: Uint8Array;
}

interface ImageData {
  data: IJS.ImageDataArray;
  width: number;
  height: number;
  depth: IJS.ColorDepth;
  colorModel: IJS.ImageColorModel;
}

export interface DecodedComputeData extends ComputeDataBase {
  type: 'decoded';
  image: ImageData;
}

export type ComputeData = EncodedComputeData | DecodedComputeData;

export interface WorkerSuccessResponse {
  type: 'success';
  time: number;
  name: string;
  data: ImageData;
}

export interface WorkerErrorResponse {
  type: 'error';
  name: string;
  error: string;
}

export type WorkerResponse = WorkerSuccessResponse | WorkerErrorResponse;
