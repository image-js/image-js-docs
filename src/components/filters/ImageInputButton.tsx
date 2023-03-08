import { decode, Image } from 'image-js';
import React, { useRef } from 'react';
import { HiOutlineDocument } from 'react-icons/hi2';

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
      className="button-icon"
      title="Import file"
      onClick={() => inputRef.current?.click()}
    >
      <HiOutlineDocument />
      <input
        ref={inputRef}
        accept="image/*"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={(event) => {
          const images: ImageFile[] = [];
          let loaded = 0;
          const files = event.target.files || [];
          for (let idx = 0; idx < files.length; idx++) {
            const file = files[idx];
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
                if (loaded === files.length) {
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
