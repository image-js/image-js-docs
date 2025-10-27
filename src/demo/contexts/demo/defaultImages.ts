import type { UrlOption } from '../importImage/importImageContext';

import dataset from './generated/imageData.json';

const defaultImages = dataset.images as UrlOption[];
const defaultMasks = dataset.masks as UrlOption[];

export { defaultImages, defaultMasks };
