import React, { ReactNode } from 'react';
import { KbsProvider } from 'react-kbs';
import { CameraProvider } from '../components/camera/cameraContext';
import { ImportImageProvider } from '../components/filters/ImportImage';

// Default implementation, that you can customize
export default function Root({ children }: { children: ReactNode }) {
  return (
    <ImportImageProvider>
      <KbsProvider>
        <CameraProvider>{children}</CameraProvider>
      </KbsProvider>
    </ImportImageProvider>
  );
}
