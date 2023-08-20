import { UrlOption } from '../importImage/importImageContext';

const standardUrl = 'https://image-js.github.io/image-dataset-demo/standard';

export const defaultImages: UrlOption[] = [
  { type: 'url', value: `${standardUrl}/lenna.png`, label: 'Lenna' },
  { type: 'url', value: `${standardUrl}/barbara.jpg`, label: 'Barbara' },
  { type: 'url', value: `${standardUrl}/boat.png`, label: 'Standard boat' },
  { type: 'url', value: `${standardUrl}/mandrill.png`, label: 'Mandrill' },
  { type: 'url', value: `${standardUrl}/peppers.png`, label: 'Peppers' },
  { type: 'url', value: `${standardUrl}/house.png`, label: 'House' },
];
