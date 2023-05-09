import React from 'react';
import {
  HiOutlineCodeBracket,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import { RxCodesandboxLogo } from 'react-icons/rx';

import {
  findCameraById,
  getCameraId,
  getCameraLabel,
  useCameraContext,
} from '../../../components/camera/cameraContext';
import {
  useDemoDispatchContext,
  useDemoStateContext,
} from '../../contexts/demo/demoContext';
import {
  ImageOption,
  isImageOption,
  isUrlOption,
  useImportImageContext,
} from '../../contexts/importImage/importImageContext';
import { useImageRunState } from '../../contexts/run/imageRunContext';
import AddonButton from '../addons/AddonButton';
import { ImageInputButton } from '../addons/ImageInputButton';
import CameraImageButton from '../snapshot/CameraImageButton';
import CameraStreamButton from '../video/CameraStreamButton';

import ImageDemoToolbarInfo from './ImageDemoToolbarInfo';

export default function ImageDemoToolbar() {
  const { selectedImage, selectedDevice } = useDemoStateContext();
  const demoDispatch = useDemoDispatchContext();

  const { images, addImages, isVideoStreamAllowed } = useImportImageContext();
  const runState = useImageRunState();

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 8px',
      }}
    >
      <div style={{ marginTop: 0 }}>
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
              const image = images.find(
                (opt) => opt.value === event.target.value,
              );
              if (device) {
                demoDispatch({ type: 'SET_SELECTED_DEVICE', payload: device });
              } else if (image) {
                if (image) {
                  demoDispatch({ type: 'SET_SELECTED_IMAGE', payload: image });
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
        <ImageDemoToolbarInfo />
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
              demoDispatch({
                type: 'SET_SELECTED_IMAGE',
                payload: newOptions[newOptions.length - 1],
              });
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
            demoDispatch({
              type: 'SET_SELECTED_IMAGE',
              payload: newOptions[0],
            });
          }}
        />
        <AddonButton addon="code">
          <HiOutlineCodeBracket />
        </AddonButton>

        <AddonButton addon="editor">
          <RxCodesandboxLogo />
        </AddonButton>
        <AddonButton
          addon="error"
          style={{ display: runState.status === 'error' ? 'inherit' : 'none' }}
        >
          <HiOutlineExclamationTriangle style={{ color: 'red' }} />
        </AddonButton>
      </div>
    </div>
  );
}
