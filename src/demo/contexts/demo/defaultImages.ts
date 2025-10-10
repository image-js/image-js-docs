import type { UrlOption } from '../importImage/importImageContext';

const standardUrl = 'https://demo-dataset.image-js.org/standard';
const standardMaskUrl = 'https://demo-dataset.image-js.org/standard_mask';
const morphologyMaskUrl = 'https://demo-dataset.image-js.org/morphology_mask';

export const defaultImages: UrlOption[] = [
  {
    type: 'url',
    value: `${standardUrl}/jellybeans.png`,
    label: 'Jelly beans ',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/female.png`,
    label: 'Female',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/femaleBellLabs.png`,
    label: 'Female from Bell Labs ',
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
    value: `${standardUrl}/mandrill.png`,
    label: 'Mandrill',
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
    value: `${standardUrl}/male.png`,
    label: 'Male',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/airport.png`,
    label: 'Airport',
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
    value: `${morphologyMaskUrl}/shapes.png`,
    label: 'Shapes',
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
    value: `${standardMaskUrl}/house.png`,
    label: 'House',
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
    value: `${standardMaskUrl}/barbara.png`,
    label: 'Barbara',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/boat.png`,
    label: 'Standard boat)',
    imageType: 'mask',
  },

  {
    type: 'url',
    value: `${standardMaskUrl}/male.png`,
    label: 'Male',
    imageType: 'mask',
  },
];
