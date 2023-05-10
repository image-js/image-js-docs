import {
  findCameraById,
  getCameraId,
  getCameraLabel,
  useCameraContext,
} from '@site/src/components/camera/cameraContext';
import React from 'react';

import { useDemoStateContext } from '../../contexts/demo/demoContext';
import {
  useSelectDevice,
  useSelectImage,
} from '../../contexts/demo/dispatchHelpers';
import {
  isImageOption,
  isUrlOption,
  useImportImageContext,
} from '../../contexts/importImage/importImageContext';

export default function SourceSelect() {
  const { selectedImage, selectedDevice } = useDemoStateContext();
  const { images, isVideoStreamAllowed } = useImportImageContext();

  const {
    cameraState: { cameras },
  } = useCameraContext();

  const shownCameras = isVideoStreamAllowed ? cameras : [];

  const standardImages = images.filter(isUrlOption);
  const customImages = images.filter((img) => isImageOption(img));

  const selectedOption = selectedDevice
    ? getCameraId(selectedDevice)
    : selectedImage?.value;

  const selectDevice = useSelectDevice();
  const selectImage = useSelectImage();

  return (
    <div className="flex-row">
      <label style={{ fontSize: '0.875em' }} htmlFor="demo-image-select">
        Source:
      </label>
      <select
        id="demo-image-select"
        style={{ width: 150, display: 'block' }}
        value={selectedOption}
        onChange={(event) => {
          const device = findCameraById(cameras, event.target.value);
          const image = images.find((opt) => opt.value === event.target.value);
          if (device) {
            selectDevice(device);
          } else if (image) {
            if (image) {
              selectImage(image);
            }
          }
        }}
      >
        {shownCameras.length > 0 && (
          <optgroup label="Video streams">
            {shownCameras.map((camera, idx) => (
              <option key={getCameraId(camera)} value={getCameraId(camera)}>
                {getCameraLabel(camera, idx)}
              </option>
            ))}
          </optgroup>
        )}
        {customImages.length > 0 && (
          <optgroup label="Custom images">
            {customImages.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </optgroup>
        )}
        <optgroup label="Standard images">
          {standardImages.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
