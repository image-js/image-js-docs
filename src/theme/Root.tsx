import React from 'react';
import { CameraProvider } from '../components/camera/cameraContext';
import { ImportImageProvider } from '../components/filters/ImportImage';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <ImportImageProvider>
      <CameraProvider>{children}</CameraProvider>
    </ImportImageProvider>
  );
}
