import { imageToMask } from '@site/src/demo/utils/image';
import React from 'react';
import {
  HiOutlineCodeBracket,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import { RxCodesandboxLogo } from 'react-icons/rx';

import { useDemoStateContext } from '../../contexts/demo/demoContext';
import { useSelectImage } from '../../contexts/demo/dispatchHelpers';
import {
  ImageDemoInputOption,
  useImportImageContext,
} from '../../contexts/importImage/importImageContext';
import AddonButton from '../addons/AddonButton';
import { ImageInputButton } from '../addons/ImageInputButton';
import CameraImageButton from '../snapshot/CameraImageButton';
import CameraStreamButton from '../video/CameraStreamButton';

import ImageDemoToolbarInfo from './ImageDemoToolbarInfo';
import SourceSelect from './SourceSelect';

export default function ImageDemoToolbar() {
  const { run, isMask } = useDemoStateContext();
  const selectImage = useSelectImage();

  const { addOptions } = useImportImageContext();

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
        {isMask ? null : <CameraStreamButton />}
        <ImageInputButton
          onImages={(images) => {
            const newOptions: Array<ImageDemoInputOption> = images.map(
              (image) => {
                if (isMask) {
                  const mask = imageToMask(image.image);
                  return {
                    type: 'mask',
                    value: `${image.file.name} (mask)`,
                    mask,
                  };
                } else {
                  return {
                    type: 'image',
                    value: image.file.name,
                    image: image.image,
                  };
                }
              },
            );
            addOptions(newOptions);
            if (newOptions.length) {
              selectImage(newOptions[newOptions.length - 1]);
            }
          }}
        />
        <CameraImageButton
          onSnapshot={({ image, name }) => {
            const newOptions: ImageDemoInputOption[] = [];
            if (isMask) {
              const mask = imageToMask(image);
              newOptions.push({
                type: 'mask',
                value: `${name} (mask)`,
                mask,
              });
            } else {
              newOptions.push({
                type: 'image',
                value: name,
                image,
              });
            }
            addOptions(newOptions);
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
