import type { UrlOption } from '../importImage/importImageContext';

const standardUrl = 'https://demo-dataset.image-js.org/standard';
const standardMaskUrl = 'https://demo-dataset.image-js.org/standard_mask';
const morphologyMaskUrl = 'https://demo-dataset.image-js.org/morphology_mask';

export const defaultImages: UrlOption[] = [
  {
    type: 'url',
    value: `${standardUrl}/jellybeans.png`,
    label: 'Jelly beans (256x256)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/female.png`,
    label: 'Female (256x256)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/femaleBellLabs.png`,
    label: 'Female from Bell Labs (256x256)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/mandrill.png`,
    label: 'Mandrill (267x256)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/house.png`,
    label: 'House (267x256)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/peppers.png`,
    label: 'Peppers (267x267)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/barbara.jpg`,
    label: 'Barbara (512x512)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/boat.png`,
    label: 'Standard boat (512x512)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/male.png`,
    label: 'Male (1024x1024)',
    imageType: 'image',
  },
  {
    type: 'url',
    value: `${standardUrl}/airport.png`,
    label: 'Airport (1024x1024)',
    imageType: 'image',
  },
];

export const defaultMasks: UrlOption[] = [
  {
    type: 'url',
    value: `${morphologyMaskUrl}/circles.png`,
    label: 'Circles (507x509)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${morphologyMaskUrl}/shapes.png`,
    label: 'Shapes (640x612)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${morphologyMaskUrl}/star.png`,
    label: 'Star (716x716)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/house.png`,
    label: 'House (267x256)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/mandrill.png`,
    label: 'Mandrill (267x256)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/peppers.png`,
    label: 'Peppers (267x267)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/barbara.png`,
    label: 'Barbara (512x512)',
    imageType: 'mask',
  },
  {
    type: 'url',
    value: `${standardMaskUrl}/boat.png`,
    label: 'Standard boat (512x512)',
    imageType: 'mask',
  },

  {
    type: 'url',
    value: `${standardMaskUrl}/male.png`,
    label: 'Male (1024x1024)',
    imageType: 'mask',
  },
];
