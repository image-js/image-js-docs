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

const options: UrlOption[] = [
  { type: 'url', value: 'Lenna.png', label: 'Lenna' },
  { type: 'url', value: 'barbara.jpg', label: 'Barbara' },
  { type: 'url', value: 'boat.png', label: 'Standard boat' },
  { type: 'url', value: 'cameraman.png', label: 'Cameraman' },
  { type: 'url', value: 'mandrill.png', label: 'Mandrill' },
  { type: 'url', value: 'peppers.png', label: 'Peppers' },
  { type: 'url', value: 'house.png', label: 'House' },
];

type UrlOption = {
  type: 'url';
  value: string;
  label: string;
};

interface ImageOption {
  type: 'image';
  value: string;
  image: Image;
}

type FilterImageOption = UrlOption | ImageOption;

const iconStyle: React.CSSProperties = {
  width: 20,
  height: 20,
  color: '#686',
};

const basePadding: React.CSSProperties = {
  padding: 8,
};

function processImage(img: Image) {
  return img.grey({ algorithm: 'luma601' }).gaussianBlur({ sigma: 1 });
}

export default function ImageFilter() {
  const [imageOptions, addOption] = useReducer<
    (state: ImageOption[], newOption: ImageOption[]) => FilterImageOption[],
    FilterImageOption[]
  >(
    (state, newOption) => {
      const newOptions = [...state, ...newOption];
      return newOptions;
    },
    options,
    () => options,
  );
  const [imageOption, setImageOption] = useState<FilterImageOption>(options[0]);
  const [filteredImage, setFilteredImage] = useState<Image | null>(null);

  useEffect(() => {
    if (imageOption.type === 'url') {
      fetch(`/img/standard/${imageOption.value}`).then((response) => {
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
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#efe',
          margin: 4,
          borderRadius: 4,
          display: 'inline-flex',
          flexDirection: 'column',
          gap: 4,
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
                <ExpandableImage
                  src={`/img/standard/${imageOption.value}`}
                  alt="original image"
                />
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
              const value = imageOptions.find(
                (opt) => opt.value === event.target.value,
              );
              setImageOption(value);
            }}
          >
            {imageOptions.map((option) => (
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
                addOption(newOptions);
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
      writeCanvas(image.resize({ height }), canvasRef.current);
    }
  }, [image, canvasRef, canvasRef]);

  useLayoutEffect(() => {
    if (image && canvasZoomRef.current) {
      writeCanvas(image, canvasZoomRef.current);
    }
  }, [canvasZoomRef, image]);

  return (
    <Zoomable
      content={<canvas ref={canvasRef} />}
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
        if (event.key === 'Escape') {
          toggle();
        }
      }}
      onClick={toggle}
    >
      <div style={{ cursor: 'zoom-in' }}>{content}</div>
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
          for (let idx = 0; idx < event.target.files.length; idx++) {
            const file = event.target.files[idx];
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target) {
                const buffer = e.target.result as ArrayBuffer;
                try {
                  const image = decode(new Uint8Array(buffer));
                  const newOption: ImageOption = {
                    type: 'image',
                    value: file.name,
                    image: image,
                  };
                  images.push({
                    image,
                    file,
                  });
                } catch (e) {
                  reportError(e);
                }
                props.onImages(images);
              }
            };
            reader.readAsArrayBuffer(file);
          }
        }}
      />
    </button>
  );
}
