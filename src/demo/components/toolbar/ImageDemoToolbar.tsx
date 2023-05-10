import React from 'react';
import {
  HiOutlineCodeBracket,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import { RxCodesandboxLogo } from 'react-icons/rx';

import { useDemoStateContext } from '../../contexts/demo/demoContext';
import { useSelectImage } from '../../contexts/demo/dispatchHelpers';
import {
  ImageOption,
  useImportImageContext,
} from '../../contexts/importImage/importImageContext';
import AddonButton from '../addons/AddonButton';
import { ImageInputButton } from '../addons/ImageInputButton';
import CameraImageButton from '../snapshot/CameraImageButton';
import CameraStreamButton from '../video/CameraStreamButton';

import ImageDemoToolbarInfo from './ImageDemoToolbarInfo';
import SourceSelect from './SourceSelect';

export default function ImageDemoToolbar() {
  const { run } = useDemoStateContext();
  const selectImage = useSelectImage();

  const { addImages } = useImportImageContext();

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
        <SourceSelect />
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
              selectImage(newOptions[newOptions.length - 1]);
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
            selectImage(newOptions[0]);
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
          style={{ display: run.status === 'error' ? 'inherit' : 'none' }}
        >
          <HiOutlineExclamationTriangle style={{ color: 'red' }} />
        </AddonButton>
      </div>
    </div>
  );
}
