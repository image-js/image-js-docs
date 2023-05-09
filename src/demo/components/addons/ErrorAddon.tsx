import React from 'react';

import { useImageRunState } from '../../contexts/run/imageRunContext';

export default function ErrorAddon() {
  const runState = useImageRunState();

  if (runState.error) {
    return <pre style={{ color: 'red' }}>{runState.error.message}</pre>;
  } else {
    return <pre style={{ fontSize: 'italic' }}>No error</pre>;
  }
}
