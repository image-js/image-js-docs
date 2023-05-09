import clsx from 'clsx';
import React, { CSSProperties, ReactNode } from 'react';

import {
  useDemoDispatchContext,
  useDemoStateContext,
} from '../../contexts/demo/demoContext';
import { Addon } from '../../utils/types';

export default function AddonButton(props: {
  addon: Addon;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const { addon, children } = props;
  const { addon: selectedAddon } = useDemoStateContext();
  const demoDispatch = useDemoDispatchContext();
  return (
    <button
      type="button"
      className={clsx('button-icon button--success', {
        'button-icon-selected': addon === selectedAddon,
      })}
      style={props.style}
      onClick={() => demoDispatch({ type: 'SET_ADDON', payload: addon })}
    >
      {children}
    </button>
  );
}
