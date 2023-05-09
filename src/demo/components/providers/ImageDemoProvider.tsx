import React from 'react';

import {
  demoStateContext,
  demoDispatchContext,
} from '../../contexts/demo/demoContext';
import {
  DemoInitialConfig,
  useDemoReducer,
} from '../../contexts/demo/demoReducer';
import {
  imageRunStateContext,
  imageRunDispatchContext,
} from '../../contexts/run/imageRunContext';
import { useRunReducer } from '../../contexts/run/runReducer';

export default function ImageDemoProvider(props: {
  children: React.ReactNode;
  initial: DemoInitialConfig;
}) {
  const [runState, runDispatch] = useRunReducer();
  const [demoState, demoDispatch] = useDemoReducer(props.initial);

  return (
    <demoDispatchContext.Provider value={demoDispatch}>
      <imageRunDispatchContext.Provider value={runDispatch}>
        <imageRunStateContext.Provider value={runState}>
          <demoStateContext.Provider value={demoState}>
            {props.children}
          </demoStateContext.Provider>
        </imageRunStateContext.Provider>
      </imageRunDispatchContext.Provider>
    </demoDispatchContext.Provider>
  );
}
