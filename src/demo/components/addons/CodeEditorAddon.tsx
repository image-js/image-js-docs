import CodeEditor from '@site/src/components/editor/CodeEditor';
import { useDebounce } from '@site/src/hooks/useDebounce';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { HiOutlinePlayCircle } from 'react-icons/hi2';

import {
  useDemoDispatchContext,
  useDemoStateContext,
} from '../../contexts/demo/demoContext';
import { useImageRunState } from '../../contexts/run/imageRunContext';
import { convertCodeToFunction } from '../../utils/convertCodeToFunction';

export default function CodeEditorAddon(props: { defaultEditorCode: string }) {
  const runState = useImageRunState();
  const { addon, noAutoRun, code } = useDemoStateContext();
  const demoDispatch = useDemoDispatchContext();
  const [editorValue, setEditorValue] = useState(props.defaultEditorCode);
  const debouncedEditorValue = useDebounce(editorValue, 1000);

  useEffect(() => {
    if (!noAutoRun) {
      // Check for syntax errors before dispatching the code
      try {
        convertCodeToFunction(debouncedEditorValue);
        demoDispatch({ type: 'SET_CODE', payload: debouncedEditorValue });
      } catch (e) {
        // Ignore
        // The code editor should highlight the syntax error
      }
    }
  }, [debouncedEditorValue, demoDispatch, noAutoRun]);
  return (
    <div style={{ position: 'relative' }}>
      <CodeEditor
        key={runState.image?.sourceImage.value}
        setEditorValue={setEditorValue}
        editorValue={editorValue}
        visible={addon === 'editor'}
      />
      {addon === 'editor' && noAutoRun && (
        <div style={{ position: 'absolute', bottom: 0, right: 16 }}>
          <PlayButton
            disabled={code === editorValue}
            onClick={() =>
              demoDispatch({ type: 'SET_CODE', payload: editorValue })
            }
          />
        </div>
      )}
    </div>
  );
}

function PlayButton(props: { disabled?: boolean; onClick: () => void }) {
  const { disabled } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx('button-icon button-icon-lg button--success', {
        'button-icon-disabled': disabled,
      })}
      onClick={props.onClick}
    >
      <HiOutlinePlayCircle width="" height="32" />
    </button>
  );
}
