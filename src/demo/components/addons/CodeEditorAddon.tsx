import CodeEditor from '@site/src/components/editor/CodeEditor';
import { useDebounce } from '@site/src/hooks/useDebounce';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import {
  HiOutlineBolt,
  HiOutlineBoltSlash,
  HiOutlinePlayCircle,
} from 'react-icons/hi2';

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
      {addon === 'editor' && (
        <div style={{ position: 'absolute', bottom: 4, right: 16 }}>
          <div className="flex-row" style={{ gap: 0 }}>
            <AutoRunButton
              noAutoRun={noAutoRun}
              onClick={() => demoDispatch({ type: 'TOGGLE_NO_AUTO_RUN' })}
            />
            {noAutoRun && (
              <PlayButton
                disabled={code === editorValue}
                onClick={() =>
                  demoDispatch({ type: 'SET_CODE', payload: editorValue })
                }
              />
            )}
          </div>
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
      className={clsx('editor-button-icon button--success', {
        'editor-button-icon-disabled': disabled,
      })}
      onClick={props.onClick}
    >
      <HiOutlinePlayCircle />
    </button>
  );
}

function AutoRunButton(props: { noAutoRun: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="editor-button-icon button--success"
      onClick={props.onClick}
    >
      {props.noAutoRun ? (
        <HiOutlineBoltSlash title="Click to enable auto-run" />
      ) : (
        <HiOutlineBolt title="Click to disable auto-run" />
      )}
    </button>
  );
}
