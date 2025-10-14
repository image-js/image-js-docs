import dataset from '../../../../static/demoImages/imageData.json';
import type { UrlOption } from '../importImage/importImageContext';

const defaultImages = dataset.images as UrlOption[];
const defaultMasks = dataset.masks as UrlOption[];

export { defaultImages, defaultMasks };
