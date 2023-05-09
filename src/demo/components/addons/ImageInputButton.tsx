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
      type="button"
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

          function processFile(e: ProgressEvent<FileReader>, file: File) {
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
          }

          const files = event.target.files || [];
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for (let idx = 0; idx < files.length; idx++) {
            const file = files[idx];
            const reader = new FileReader();
            reader.onload = (e) => {
              processFile(e, file);
            };
            reader.readAsArrayBuffer(file);
          }
        }}
      />
    </button>
  );
}
