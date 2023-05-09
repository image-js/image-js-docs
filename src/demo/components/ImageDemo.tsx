import React from 'react';

import { useDemoStateContext } from '../contexts/demo/demoContext';

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
    <ImageDemoProvider initial={{ noAutoRun, initialCode: defaultEditorCode }}>
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
          <ImageDemoImages name={name} />
          <ImageDemoToolbar />
          <ImageDemoAddon code={code} defaultEditorCode={defaultEditorCode} />
        </div>
      </div>
    </ImageDemoProvider>
  );
}

function ImageDemoImages(props: { name: string }) {
  const { selectedDevice, selectedImage, code } = useDemoStateContext();
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {selectedDevice ? (
        <ExpandableVideoDuo
          selectedDevice={selectedDevice}
          code={code}
          name={props.name}
        />
      ) : (
        <ExpandableImageDuo
          selectedImage={selectedImage}
          code={code}
          name={props.name}
        />
      )}
    </div>
  );
}
