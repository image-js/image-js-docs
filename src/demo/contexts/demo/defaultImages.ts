import type { UrlOption } from '../importImage/importImageContext';

const standardUrl = 'https://image-js.github.io/image-dataset-demo/standard';
const standardMaskUrl =
  'https://image-js.github.io/image-dataset-demo/standard_mask';
const morphologyMaskUrl =
  'https://image-js.github.io/image-dataset-demo/morphology_mask';

export const defaultImages: UrlOption[] = [
  {
    type: 'url',
    value: `${standardUrl}/mandrill.png`,
    label: 'Mandrill',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/barbara.jpg`,
    label: 'Barbara',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/boat.png`,
    label: 'Standard boat',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/peppers.png`,
    label: 'Peppers',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/house.png`,
    label: 'House',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/lenna.png`,
    label: 'Lenna',
    imageType: 'image',
  },
];

export const defaultMasks: UrlOption[] = [
  {
    type: 'url',
    value: `${morphologyMaskUrl}/circles.png`,
    label: 'Circles',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${morphologyMaskUrl}/star.png`,
    label: 'Star',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${morphologyMaskUrl}/shapes.png`,
    label: 'Shapes',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/lenna.png`,
    label: 'Lenna',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/barbara.png`,
    label: 'Barbara',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/boat.png`,
    label: 'Standard boat',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/mandrill.png`,
    label: 'Mandrill',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/peppers.png`,
    label: 'Peppers',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/house.png`,
    label: 'House',
    imageType: 'mask',
  },
];
