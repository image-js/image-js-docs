import React from 'react';

import { useDemoStateContext } from '../../contexts/demo/demoContext';

export default function ErrorAddon() {
  const { run } = useDemoStateContext();

  if (run.error) {
    if (run.error instanceof Error) {
      return <pre style={{ color: 'red' }}>{run.error.message}</pre>;
    } else {
      return (
        <pre style={{ color: 'red' }}>{JSON.stringify(run.error, null, 2)}</pre>
      );
    }
  } else {
    return <pre style={{ fontSize: 'italic' }}>No error</pre>;
  }
}
