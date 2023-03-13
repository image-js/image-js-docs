import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import { Image } from 'image-js';
import React, { useState, CSSProperties } from 'react';
import { HiOutlineCodeBracket } from 'react-icons/hi2';
import { RxCodesandboxLogo } from 'react-icons/rx';

import CameraImageButton from '../camera/CameraImageButton';
import CameraStreamButton from '../camera/CameraStreamButton';
import {
  findCameraById,
  getCameraId,
  getCameraLabel,
  useCameraContext,
} from '../camera/cameraContext';
import { useOnOff } from '../utils/useOnOff';

import ExpandableImageDuo from './ExpandableImageDuo';
import ExpandableVideoDuo from './ExpandableVideoDuo';
import { ImageInputButton } from './ImageInputButton';
import {
  FilterImageOption,
  ImageOption,
  isImageOption,
  isUrlOption,
  useImportImageProvider,
} from './importImageContext';

const basePadding: CSSProperties = {
  padding: 8,
};

export default function ImageFilter({
  processImage,
  code,
  hideCode,
}: {
  processImage: (img: Image) => Image;
  code: string;
  hideCode?: boolean;
}) {
  const { images, addImages, isVideoStreamAllowed } = useImportImageProvider();
  const [isShowingCode, , , toggleCode] = useOnOff(!hideCode);

  const [selectedImage, setSelectedImage] = useState<FilterImageOption>(
    images[0],
  );
  const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(
    null,
  );

  const {
    cameraState: { cameras },
  } = useCameraContext();

  const shownCameras = isVideoStreamAllowed ? cameras : [];

  const standardImages = images.filter(isUrlOption);
  const customImages = images.filter((img) => isImageOption(img));

  const selectedOption = selectedDevice
    ? getCameraId(selectedDevice)
    : selectedImage.value;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
      <div
        className="filter-demo alert--success"
        style={{
          margin: 4,
          borderRadius: 4,
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 8,
          ...basePadding,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 4,
          }}
        >
          {selectedDevice ? (
            <ExpandableVideoDuo
              selectedDevice={selectedDevice}
              processImage={processImage}
            />
          ) : (
            <ExpandableImageDuo
              selectedImage={selectedImage}
              processImage={processImage}
            />
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="flex-row">
            <label
              style={{ fontSize: '0.875em' }}
              htmlFor="image-filter-select"
            >
              Source:
            </label>
            <select
              id="image-filter-select"
              style={{ width: 150, display: 'block' }}
              value={selectedOption}
              onChange={(event) => {
                const device = findCameraById(cameras, event.target.value);
                const image = images.find(
                  (opt) => opt.value === event.target.value,
                );
                if (device) {
                  setSelectedDevice(device);
                } else if (image) {
                  if (image) {
                    setSelectedImage(image);
                    setSelectedDevice(null);
                  }
                }
              }}
            >
              {shownCameras.length > 0 && (
                <optgroup label="Video streams">
                  {shownCameras.map((camera, idx) => (
                    <option
                      key={getCameraId(camera)}
                      value={getCameraId(camera)}
                    >
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
          <div style={{ display: 'flex', gap: 4 }}>
            <CameraStreamButton />
            <ImageInputButton
              onImages={(images) => {
                const newOptions: ImageOption[] = images.map((image) => ({
                  type: 'image',
                  value: image.file.name,
                  image: image.image,
                }));
                addImages(newOptions);
                if (newOptions.length) {
                  setSelectedImage(newOptions[newOptions.length - 1]);
                  setSelectedDevice(null);
                }
              }}
            />
            <CameraImageButton
              onSnapshot={({ image, name }) => {
                const newOptions: ImageOption[] = [
                  {
                    type: 'image',
                    value: name,
                    image,
                  },
                ];
                addImages(newOptions);
                setSelectedImage(newOptions[0]);
                setSelectedDevice(null);
              }}
            />
            <button
              type="button"
              className={clsx('button-icon button--success', {
                'button-icon-selected': isShowingCode,
              })}
              onClick={toggleCode}
            >
              <HiOutlineCodeBracket />
            </button>
            <button type="button" className="button-icon">
              <RxCodesandboxLogo />
            </button>
          </div>
        </div>
      </div>
      {isShowingCode && <CodeBlock className="language-ts">{code}</CodeBlock>}
    </div>
  );
}
