import { ProcessImage } from '@site/src/types/IJS';

export function convertCodeToFunction(code: string) {
  const newCode = code
    .replace(/\}\s*$/, '')
    // eslint-disable-next-line prefer-named-capture-group
    .replace(/^(.|\n)*export function.+\{/g, '');

  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  return new Function('image', 'IJS', newCode) as ProcessImage;
}
