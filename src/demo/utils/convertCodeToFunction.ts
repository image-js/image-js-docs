import type { ProcessImage } from '@site/src/types/IJS';

export function convertCodeToFunction(code: string, isMask: boolean) {
  const newCode = code
    .replace(/}\s*$/, '')
    // eslint-disable-next-line prefer-named-capture-group
    .replace(/^(.|\n)*export function.+\{/g, '');

  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  return new Function(
    isMask ? 'mask' : 'image',
    'IJS',
    newCode,
  ) as ProcessImage;
}
