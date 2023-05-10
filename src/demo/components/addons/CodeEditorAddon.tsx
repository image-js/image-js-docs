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
import { useRunCode } from '../../contexts/demo/dispatchHelpers';
import { convertCodeToFunction } from '../../utils/convertCodeToFunction';

export default function CodeEditorAddon(props: { defaultEditorCode: string }) {
  const { addon, noAutoRun, run, selectedDevice } = useDemoStateContext();
  const demoDispatch = useDemoDispatchContext();
  const [editorValue, setEditorValue] = useState(props.defaultEditorCode);
  const debouncedEditorValue = useDebounce(editorValue, 1000);
  const runCode = useRunCode();

  const debouncedStatus = useDebounce(run.status, 200);
  const disabled =
    !selectedDevice &&
    (debouncedStatus === 'running' || run.status === 'running');

  useEffect(() => {
    if (!noAutoRun) {
      // Check for syntax errors before dispatching the code
      try {
        convertCodeToFunction(debouncedEditorValue);
        runCode(debouncedEditorValue);
      } catch (e) {
        // Ignore
        // The code editor should highlight the syntax error
      }
    }
  }, [debouncedEditorValue, runCode, noAutoRun]);
  return (
    <div style={{ position: 'relative' }}>
      <CodeEditor
        key={run.image?.sourceImage.value}
        setEditorValue={setEditorValue}
        editorValue={editorValue}
        visible={addon === 'editor'}
      />
      {addon === 'editor' && (
        <div style={{ position: 'absolute', bottom: 4, right: 16 }}>
          <div className="flex-row" style={{ gap: 0 }}>
            {noAutoRun && (
              <PlayButton
                disabled={disabled}
                onClick={() => {
                  runCode(editorValue);
                }}
              />
            )}
            <AutoRunButton
              noAutoRun={noAutoRun}
              onClick={() => demoDispatch({ type: 'TOGGLE_NO_AUTO_RUN' })}
            />
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
