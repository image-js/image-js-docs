import React from 'react';

import {
  demoDispatchContext,
  demoStateContext,
} from '../../contexts/demo/demoContext';
import type { DemoInitialConfig } from '../../contexts/demo/demoReducer';
import { useDemoReducer } from '../../contexts/demo/demoReducer';

export default function ImageDemoProvider(props: {
  children: React.ReactNode;
  initial: DemoInitialConfig;
}) {
  const [demoState, demoDispatch] = useDemoReducer(props.initial);

  return (
    <demoDispatchContext.Provider value={demoDispatch}>
      <demoStateContext.Provider value={demoState}>
        {props.children}
      </demoStateContext.Provider>
    </demoDispatchContext.Provider>
  );
}
