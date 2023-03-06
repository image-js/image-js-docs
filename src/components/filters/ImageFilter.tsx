import React, { useEffect, useState, CSSProperties, useRef } from 'react';
import { decode, Image } from 'image-js';
import { RxCodesandboxLogo } from 'react-icons/rx';
import {
  FilterImageOption,
  ImageOption,
  useImportImageProvider,
} from './ImportImage';
import { ExpandableImages, ImageSrc } from './ExpandableImages';
import { iconStyle } from '../styles/icon';
import { ImageInputButton } from './ImageInputButton';
import CameraImageButton from '../camera/CameraImageButton';
import { HiOutlineCodeBracket } from 'react-icons/hi2';
import CameraStreamButton from '../camera/CameraStreamButton';
import { rowStyle } from '../styles/flex';

const basePadding: CSSProperties = {
  padding: 8,
};

function processImage(img: Image) {
  return img.grey({ algorithm: 'luma601' });
}

export default function ImageFilter() {
  const { images, addImages } = useImportImageProvider();

  const [selectedImage, setSelectedImage] = useState<FilterImageOption>(
    images[0],
  );
  const [filteredImage, setFilteredImage] = useState<Image | null>(null);

  useEffect(() => {
    if (selectedImage.type === 'url') {
      fetch(selectedImage.value).then((response) => {
        response.arrayBuffer().then((buffer) => {
          setFilteredImage(processImage(decode(new Uint8Array(buffer))));
        });
      });
    } else {
      setFilteredImage(processImage(selectedImage.image));
    }
  }, [selectedImage]);

  const expandableImages: ImageSrc[] = [];
  if (filteredImage) {
    expandableImages.push(filteredImage);
  }
  if (selectedImage.type === 'url') {
    expandableImages.unshift(selectedImage.value);
  } else {
    expandableImages.unshift(selectedImage.image);
  }

  return (
    <div>
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
          {filteredImage ? (
            <ExpandableImages images={expandableImages} />
          ) : (
            <>
              <img
                src="/img/placeholder-image.png"
                alt="placeholder"
                width="256"
                height="256"
              />
              <img
                src="/img/placeholder-image.png"
                alt="placeholder"
                width="256"
                height="256"
              />
            </>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={rowStyle}>
            <label
              style={{ fontSize: '0.875em' }}
              htmlFor="image-filter-select"
            >
              Source:
            </label>
            <select
              id="image-filter-select"
              style={{ width: 150, display: 'block' }}
              value={selectedImage.value}
              onChange={(event) => {
                const value = images.find(
                  (opt) => opt.value === event.target.value,
                );
                if (value) {
                  setSelectedImage(value);
                }
              }}
            >
              {images.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.type === 'url' ? option.label : option.value}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
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
              }}
            />
            <button style={{ height: '1em' }}>
              <HiOutlineCodeBracket style={iconStyle} />
            </button>
            <button style={{ height: '1em' }}>
              <RxCodesandboxLogo style={iconStyle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
