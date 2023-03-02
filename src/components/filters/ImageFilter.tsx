import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import { decode, Image, writeCanvas } from 'image-js';
import CodeIcon from '../../components/icons/CodeIcon';
import CodepenIcon from '../../components/icons/CodepenIcon';
import FileIcon from '../icons/FileIcon';
import {
  FilterImageOption,
  ImageOption,
  useImportImageProvider,
} from './ImportImage';

const iconStyle: React.CSSProperties = {
  width: 18,
  height: 18,
};

const basePadding: React.CSSProperties = {
  padding: 8,
};

function processImage(img: Image) {
  return img.grey({ algorithm: 'luma601' }).gaussianBlur({ sigma: 1 });
}

export default function ImageFilter() {
  const { images, addImages } = useImportImageProvider();

  const [imageOption, setImageOption] = useState<FilterImageOption>(images[0]);
  const [filteredImage, setFilteredImage] = useState<Image | null>(null);

  useEffect(() => {
    if (imageOption.type === 'url') {
      fetch(imageOption.value).then((response) => {
        response.arrayBuffer().then((buffer) => {
          setFilteredImage(processImage(decode(new Uint8Array(buffer))));
        });
      });
    } else {
      setFilteredImage(processImage(imageOption.image));
    }
  }, [imageOption]);

  return (
    <div>
      <div
        className="filter-demo alert--success"
        style={{
          // border: '1px solid #ccc',
          // backgroundColor: '#efe',
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
            <>
              {imageOption.type === 'url' ? (
                <ExpandableImage src={imageOption.value} alt="original image" />
              ) : (
                <ExpandableCanvas image={imageOption.image} />
              )}
            </>
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

          <ExpandableCanvas image={filteredImage} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <select
            style={{ width: 150, display: 'block' }}
            value={imageOption.value}
            onChange={(event) => {
              const value = images.find(
                (opt) => opt.value === event.target.value,
              );
              setImageOption(value);
            }}
          >
            {images.map((option) => (
              <option key={option.value} value={option.value}>
                {option.type === 'url' ? option.label : option.value}
              </option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <ImageInputButton
              onImages={(images) => {
                const newOptions: ImageOption[] = images.map((image) => ({
                  type: 'image',
                  value: image.file.name,
                  image: image.image,
                }));
                addImages(newOptions);
                if (newOptions.length) {
                  setImageOption(newOptions[newOptions.length - 1]);
                }
              }}
            />
            <button style={{ height: '1em' }}>
              <CodeIcon style={iconStyle} />
            </button>
            <button style={{ height: '1em' }}>
              <CodepenIcon style={iconStyle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandableCanvas(props: { image: Image | null; height?: number }) {
  const { image, height = 256 } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const canvasZoomRef = React.useRef<HTMLCanvasElement>(null);
  const [zooming, toggle] = useReducer((state) => !state, false);

  useLayoutEffect(() => {
    if (image && canvasRef.current) {
      writeCanvas(image, canvasRef.current);
    }
  }, [image, canvasRef]);

  useLayoutEffect(() => {
    if (image && canvasZoomRef.current) {
      writeCanvas(image, canvasZoomRef.current);
    }
  }, [canvasZoomRef, image]);

  if (!image) {
    return null;
  }

  return (
    <Zoomable
      content={<canvas style={{ height }} ref={canvasRef} />}
      isOpen={zooming}
      toggle={toggle}
    >
      <canvas ref={canvasZoomRef} />
    </Zoomable>
  );
}

function ExpandableImage(props: {
  src: string;
  height?: number;
  alt?: string;
}) {
  const { src, height = 256, alt } = props;
  const [zooming, toggle] = useReducer((state) => !state, false);

  return (
    <Zoomable
      content={<img src={src} height={height} alt={alt} />}
      isOpen={zooming}
      toggle={toggle}
    >
      <img style={{ zIndex: 10000 }} src={src} alt={alt} />
    </Zoomable>
  );
}

function Zoomable(props: {
  children: ReactNode;
  toggle: () => void;
  isOpen: boolean;
  content: ReactNode;
}) {
  const { toggle, isOpen, children, content } = props;
  return (
    <div
      role="button"
      tabIndex={1}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          toggle();
        }
      }}
      onClick={toggle}
    >
      <div style={{ cursor: 'zoom-in', display: 'flex' }}>{content}</div>
      <div
        style={{
          cursor: 'zoom-out',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', alignSelf: 'center' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface ImageFile {
  image: Image;
  file: File;
}

function ImageInputButton(props: { onImages: (images: ImageFile[]) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

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
