import { Image, writeCanvas } from 'image-js';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

export type ImageSrc = Image | string;

export function ExpandableImages(props: { images: ImageSrc[] }) {
  const { images } = props;
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => {
    setCurrent((current) => Math.min(current + 1, images.length - 1));
  }, [setCurrent, images]);

  const previous = useCallback(() => {
    setCurrent((current) => Math.max(current - 1, 0));
  }, [setCurrent, images]);

  const [isOpen, toggleOpen] = useReducer((state) => !state, false);

  const value = useMemo(() => {
    return { next, previous, set: setCurrent, isOpen, toggleOpen };
  }, [current, setCurrent, images, isOpen, toggleOpen]);

  if (images.length === 0) return null;
  const currentImage = images[current];

  return (
    <expandableImagesContext.Provider value={value}>
      <div
        style={{ display: 'flex', gap: 4 }}
        onKeyDown={(event) => {
          if (isOpen) {
            switch (event.key) {
              case 'Escape':
                toggleOpen();
                break;
              case 'ArrowRight':
                next();
                break;
              case 'ArrowLeft':
                previous();
                break;
            }
          }
        }}
      >
        {images.map((image, idx) => (
          <ZoomableImageOrCanvas key={idx} image={image} index={idx} />
        ))}
      </div>
      {isOpen && (
        <div
          tabIndex={1}
          style={{
            cursor: 'zoom-out',
            display: 'flex',
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
          onClick={toggleOpen}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            {typeof currentImage === 'string' ? (
              <img src={currentImage} />
            ) : (
              <CanvasImage image={currentImage} />
            )}
          </div>
        </div>
      )}
    </expandableImagesContext.Provider>
  );
}

interface ExpandableImagesContext {
  next: () => void;
  previous: () => void;
  set: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  toggleOpen: () => void;
}

const expandableImagesContext = createContext<ExpandableImagesContext | null>(
  null,
);

function useExpandableImages() {
  const context = useContext(expandableImagesContext);
  if (!context) {
    throw new Error('expected context to be defined');
  }
  return context;
}

function useToggleImage(index: number) {
  const { set, toggleOpen, isOpen } = useExpandableImages();
  const showImage = useCallback(() => {
    toggleOpen();
    set(index);
  }, [toggleOpen, set, index]);
  return showImage;
}

function ZoomableImageOrCanvas(props: {
  image: string | Image;
  height?: number;
  index: number;
}) {
  const { image, height = 256, index } = props;

  if (typeof image === 'string') {
    return <ZoomableImage src={image} height={height} index={index} />;
  } else {
    return <ZoomableCanvas image={image} height={height} index={index} />;
  }
}

function ZoomableCanvas(props: {
  image: Image | null;
  height: number;
  index: number;
}) {
  const { image, height, index } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toggle = useToggleImage(props.index);

  useLayoutEffect(() => {
    if (image && canvasRef.current) {
      writeCanvas(image, canvasRef.current);
    }
  }, [image, canvasRef]);

  if (!image) {
    return null;
  }

  return (
    <canvas
      style={{ maxHeight: height, maxWidth: '50%', cursor: 'zoom-in' }}
      ref={canvasRef}
      role="button"
      tabIndex={1}
      onClick={toggle}
    />
  );
}

function ZoomableImage(props: {
  src: string;
  height: number;
  alt?: string;
  index: number;
}) {
  const { src, height, alt, index } = props;
  const toggle = useToggleImage(props.index);
  return (
    <img
      src={src}
      alt={alt}
      style={{ maxHeight: height, maxWidth: '50%', cursor: 'zoom-in' }}
      role="button"
      tabIndex={1}
      onClick={toggle}
    />
  );
}

function CanvasImage(props: { image: Image }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { image } = props;
  useLayoutEffect(() => {
    if (image && canvasRef.current) {
      writeCanvas(image, canvasRef.current);
    }
  }, [image, canvasRef]);
  return <canvas ref={canvasRef} />;
}
