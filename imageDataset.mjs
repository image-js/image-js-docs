const standardUrl = 'https://demo-dataset.image-js.org/standard';
const standardMaskUrl = 'https://demo-dataset.image-js.org/standard_mask';
const morphologyMaskUrl = 'https://demo-dataset.image-js.org/morphology_mask';

export const defaultImages = [
  {
    value: `${standardUrl}/jellybeans.png`,
    label: 'Jelly beans ',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/female.png`,
    label: 'Female',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/femaleBellLabs.png`,
    label: 'Female from Bell Labs ',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/house.png`,
    label: 'House',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/mandrill.png`,
    label: 'Mandrill',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/peppers.png`,
    label: 'Peppers',
    imageType: 'image',
  },

  {
    value: `${standardUrl}/barbara.jpg`,
    label: 'Barbara',
    imageType: 'image',
  },

  {
    value: `${standardUrl}/boat.png`,
    label: 'Standard boat',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/male.png`,
    label: 'Male',
    imageType: 'image',
  },
  {
    value: `${standardUrl}/airport.png`,
    label: 'Airport',
    imageType: 'image',
  },
];

export const defaultMasks = [
  {
    type: 'url',
    value: `${morphologyMaskUrl}/circles.png`,
    label: 'Circles',
    imageType: 'mask',
  },
  {
    value: `${morphologyMaskUrl}/shapes.png`,
    label: 'Shapes',
    imageType: 'mask',
  },
  {
    value: `${morphologyMaskUrl}/star.png`,
    label: 'Star',
    imageType: 'mask',
  },
  {
    value: `${standardMaskUrl}/house.png`,
    label: 'House',
    imageType: 'mask',
  },
  {
    value: `${standardMaskUrl}/mandrill.png`,
    label: 'Mandrill',
    imageType: 'mask',
  },
  {
    value: `${standardMaskUrl}/peppers.png`,
    label: 'Peppers',
    imageType: 'mask',
  },

  {
    value: `${standardMaskUrl}/barbara.png`,
    label: 'Barbara',
    imageType: 'mask',
  },
  {
    value: `${standardMaskUrl}/boat.png`,
    label: 'Standard boat',
    imageType: 'mask',
  },

  {
    value: `${standardMaskUrl}/male.png`,
    label: 'Male',
    imageType: 'mask',
  },
];
