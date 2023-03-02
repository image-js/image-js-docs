import React from 'react';
import { ImportImageProvider } from '../components/filters/ImportImage';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <ImportImageProvider>{children}</ImportImageProvider>;
}
