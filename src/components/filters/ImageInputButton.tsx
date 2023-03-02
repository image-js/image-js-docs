import { decode, Image } from 'image-js';
import React, { useRef } from 'react';
import FileIcon from '../icons/FileIcon';
import { iconStyle } from '../styles/icon';

interface ImageFile {
  image: Image;
  file: File;
}

export function ImageInputButton(props: {
  onImages: (images: ImageFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <button
      style={{ height: '1em' }}
      title="Import file"
      onClick={() => inputRef.current?.click()}
    >
      <FileIcon style={iconStyle} />
      <input
        ref={inputRef}
        accept="image/*"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={(event) => {
          const images: ImageFile[] = [];
          let loaded = 0;
          for (let idx = 0; idx < event.target.files.length; idx++) {
            const file = event.target.files[idx];
            const reader = new FileReader();
            reader.onload = (e) => {
              loaded++;
              if (e.target) {
                const buffer = e.target.result as ArrayBuffer;
                try {
                  const image = decode(new DataView(buffer));
                  images.push({
                    image,
                    file,
                  });
                } catch (e) {
                  reportError(e);
                }
                if (loaded === event.target.files.length) {
                  props.onImages(images);
                }
              }
            };
            reader.readAsArrayBuffer(file);
          }
        }}
      />
    </button>
  );
}
