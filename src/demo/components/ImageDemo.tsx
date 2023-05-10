import React, { useEffect } from 'react';

import { defaultImages } from '../contexts/demo/defaultImages';
import { useDemoStateContext } from '../contexts/demo/demoContext';
import { useSelectImage } from '../contexts/demo/dispatchHelpers';

import ImageDemoAddon from './addons/ImageDemoAddon';
import ExpandableImageDuo from './image/ExpandableImageDuo';
import ImageDemoProvider from './providers/ImageDemoProvider';
import ImageDemoToolbar from './toolbar/ImageDemoToolbar';
import ExpandableVideoDuo from './video/ExpandableVideoDuo';

export default function ImageDemo({
  name,
  code,
  defaultEditorCode,
  noAutoRun,
}: {
  name: string;
  code: string;
  defaultEditorCode: string;
  noAutoRun?: boolean;
}) {
  return (
    <ImageDemoProvider
      initial={{ noAutoRun, initialCode: defaultEditorCode, name }}
    >
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
          <ImageDemoImages />
          <ImageDemoToolbar />
          <ImageDemoAddon
            exampleCode={code}
            defaultEditorCode={defaultEditorCode}
          />
        </div>
      </div>
    </ImageDemoProvider>
  );
}

function ImageDemoImages() {
  const { selectedDevice, selectedImage } = useDemoStateContext();
  const selectImage = useSelectImage();

  useEffect(() => {
    if (!selectedImage && !selectedDevice) {
      // This is only true when the context is first initialized
      // So this will run only once per demo
      selectImage(defaultImages[0]);
    }
  }, [selectedImage, selectedDevice, selectImage]);
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {selectedDevice ? (
        <ExpandableVideoDuo selectedDevice={selectedDevice} />
      ) : (
        <ExpandableImageDuo />
      )}
    </div>
  );
}
