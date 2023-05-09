import CodeBlock from '@theme/CodeBlock';
import React from 'react';

import { useDemoStateContext } from '../../contexts/demo/demoContext';

import CodeEditorAddon from './CodeEditorAddon';
import ErrorAddon from './ErrorAddon';

export default function ImageDemoAddon(props: {
  code: string;
  defaultEditorCode: string;
}) {
  const { addon } = useDemoStateContext();

  return (
    <div className="filter-demo-addon">
      {addon === 'code' && (
        <CodeBlock className="language-ts">{props.code}</CodeBlock>
      )}
      {addon === 'error' && <ErrorAddon />}
      {/* We always render this addon */}
      <CodeEditorAddon defaultEditorCode={props.defaultEditorCode} />
    </div>
  );
}
