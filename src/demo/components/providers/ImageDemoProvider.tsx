import React from 'react';

import {
  demoStateContext,
  demoDispatchContext,
} from '../../contexts/demo/demoContext';
import {
  DemoInitialConfig,
  useDemoReducer,
} from '../../contexts/demo/demoReducer';

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
