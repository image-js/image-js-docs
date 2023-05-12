// This file must have worker types, but not DOM types.
// The global should be that of a dedicated worker.
import { convertCodeToFunction } from '@site/src/demo/utils/convertCodeToFunction';
import { ComputeData, ProcessImage, WorkerResponse } from '@site/src/types/IJS';
import * as IJS from 'image-js';

onmessage = (event: MessageEvent<ComputeData>) => {
  const data = event.data;
  const image =
    data.type === 'encoded'
      ? IJS.decode(data.data)
      : new IJS.Image(data.image.width, data.image.height, {
          colorModel: data.image.colorModel,
          bitDepth: data.image.bitDepth,
          data: data.image.data,
        });

  let processImage: ProcessImage = () => image;
  try {
    processImage = convertCodeToFunction(event.data.code || '');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    postResponse({ type: 'error', error: err.message, name: event.data.name });
    return;
  }
  try {
    const start = performance.now();
    const newImage = processImage(image, IJS);
    const end = performance.now();
    if (newImage instanceof IJS.Image) {
      const imageRaw = newImage.getRawImage();
      postResponse({
        type: 'success',
        data: {
          type: 'image',
          data: imageRaw.data,
          width: newImage.width,
          height: newImage.height,
          bitDepth: newImage.bitDepth,
          colorModel: newImage.colorModel,
        },
        time: end - start,
        name: event.data.name,
      });
    } else {
      const maskRaw = newImage.getRawImage();
      postResponse({
        type: 'success',
        data: {
          type: 'mask',
          data: maskRaw.data,
          width: newImage.width,
          height: newImage.height,
        },
        time: end - start,
        name: event.data.name,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    reportError(err);
    postResponse({ type: 'error', error: err.message, name: event.data.name });
  }
};

function postResponse(response: WorkerResponse) {
  if (response.type === 'error') {
    postMessage(response);
  } else {
    // @ts-expect-error - this is actually how it is supposed to be sent
    postMessage(response, [response.data.data.buffer]);
  }
}
