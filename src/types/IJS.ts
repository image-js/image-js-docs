import * as IJS from 'image-js';

type IJSType = typeof IJS;

export type ProcessImage = (image: IJS.Image, IJS: IJSType) => IJS.Image;
