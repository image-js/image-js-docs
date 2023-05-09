import { createContext, Dispatch, useContext } from 'react';

import { DemoAction, DemoState } from './demoReducer';

export const demoStateContext = createContext<DemoState | null>(null);
export const demoDispatchContext = createContext<Dispatch<DemoAction> | null>(
  null,
);

export const useDemoStateContext = () => {
  const context = useContext(demoStateContext);
  if (!context) {
    throw new Error(
      'useDemoStateContext must be used within a ImageDemoProvider',
    );
  }
  return context;
};

export const useDemoDispatchContext = () => {
  const context = useContext(demoDispatchContext);
  if (!context) {
    throw new Error(
      'useDemoDispatchContext must be used within a ImageDemoProvider',
    );
  }
  return context;
};
