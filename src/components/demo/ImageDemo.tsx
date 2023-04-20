import { useDebounce } from '@site/src/hooks/useDebounce';
import { ProcessImage } from '@site/src/types/IJS';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import { Image } from 'image-js';
import * as IJS from 'image-js';
import React, {
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react';
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
import CodeEditor from '../editor/CodeEditor';

import ExpandableImageDuo from './ExpandableImageDuo';
import ExpandableVideoDuo from './ExpandableVideoDuo';
import { ImageInputButton } from './ImageInputButton';
import { convertCodeToFunction } from './convertCodeToFunction';
import {
  FilterImageOption,
  ImageOption,
  isImageOption,
  isUrlOption,
  useImportImageProvider,
} from './importImageContext';

function identity(img: Image) {
  return img;
}

type Addon = 'code' | 'editor';
export default function ImageDemo({
  processImage,
  code,
  defaultEditorCode,
}: {
  processImage: (img: Image) => Image;
  code: string;
  defaultEditorCode: string;
}) {
  const [editorValue, setEditorValue] = useState(defaultEditorCode);
  const [customFunction, setCustomFunction] = useState<ProcessImage>(identity);
  const debouncedEditorValue = useDebounce(editorValue, 1000);
  const { images, addImages, isVideoStreamAllowed } = useImportImageProvider();
  const [addon, setAddon] = useState<Addon | null>(null);
  const processAndCheck = useMemo(() => {
    if (addon === 'editor') {
      return processImageWithCheck(customFunction);
    } else {
      return processImageWithCheck(processImage);
    }
  }, [processImage, addon, customFunction]);

  useEffect(() => {
    try {
      const fn = convertCodeToFunction(debouncedEditorValue || '');
      setCustomFunction(() => fn);
    } catch (err: any) {
      setCustomFunction(() => () => {
        throw err;
      });
    }
  }, [debouncedEditorValue]);

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
          padding: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          {selectedDevice ? (
            <ExpandableVideoDuo
              selectedDevice={selectedDevice}
              processImage={processAndCheck}
            />
          ) : (
            <ExpandableImageDuo
              selectedImage={selectedImage}
              processImage={processAndCheck}
            />
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '4px 8px',
          }}
        >
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
            <AddonButton
              addon="code"
              selectedAddon={addon}
              setSelectedAddon={setAddon}
            >
              <HiOutlineCodeBracket />
            </AddonButton>
            <AddonButton
              addon="editor"
              selectedAddon={addon}
              setSelectedAddon={setAddon}
            >
              <RxCodesandboxLogo />
            </AddonButton>
          </div>
        </div>
        <div className="filter-demo-addon">
          {addon === 'code' && (
            <CodeBlock className="language-ts">{code}</CodeBlock>
          )}
          <CodeEditor
            setEditorValue={setEditorValue}
            editorValue={editorValue}
            visible={addon === 'editor'}
          />
        </div>
      </div>
    </div>
  );
}

function AddonButton(props: {
  addon: Addon;
  selectedAddon: Addon | null;
  setSelectedAddon: Dispatch<SetStateAction<Addon | null>>;
  children: ReactNode;
}) {
  const { addon, selectedAddon, setSelectedAddon, children } = props;
  return (
    <button
      type="button"
      className={clsx('button-icon button--success', {
        'button-icon-selected': addon === selectedAddon,
      })}
      onClick={() => setSelectedAddon(addon)}
    >
      {children}
    </button>
  );
}

function processImageWithCheck(fn: ProcessImage) {
  return (image: Image) => {
    const img = fn(image, IJS);
    if (!(img instanceof Image)) {
      throw new Error('the function should return an image');
    }
    return img;
  };
}
