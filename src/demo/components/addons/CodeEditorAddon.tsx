import CodeEditor from '@site/src/components/editor/CodeEditor';
import { useDebounce } from '@site/src/hooks/useDebounce';
import React, { useEffect, useRef, useState } from 'react';
import {
  HiOutlineBolt,
  HiOutlineBoltSlash,
  HiOutlinePlayCircle,
  HiOutlineStopCircle,
} from 'react-icons/hi2';

import {
  useDemoDispatchContext,
  useDemoStateContext,
} from '../../contexts/demo/demoContext';
import { useRunCode } from '../../contexts/demo/dispatchHelpers';
import { convertCodeToFunction } from '../../utils/convertCodeToFunction';

export default function CodeEditorAddon(props: { defaultEditorCode: string }) {
  const { addon, noAutoRun, run, selectedDevice, code } = useDemoStateContext();
  const demoDispatch = useDemoDispatchContext();
  const [editorValue, setEditorValue] = useState(props.defaultEditorCode);
  const debouncedEditorValue = useDebounce(editorValue, 1000);
  const { runCode, stopCode } = useRunCode();

  // We need refs for anything that is referenced in a CodeEditor command
  // Because the handler is created once and never updated
  const refs = useRef({ noAutoRun, runCode, editorValue });
  useEffect(() => {
    refs.current = { noAutoRun, runCode, editorValue };
  }, [noAutoRun, runCode, editorValue]);

  useEffect(() => {
    if (!noAutoRun && code !== debouncedEditorValue) {
      // Check for syntax errors before dispatching the code
      try {
        convertCodeToFunction(debouncedEditorValue);
        runCode(debouncedEditorValue);
      } catch (e) {
        // Ignore
        // The code editor should highlight the syntax error
      }
    }
  }, [debouncedEditorValue, runCode, noAutoRun, code]);

  // Video streams cannot be stopped, instead the code can be updated at anytime
  // And the new code will apply on the next frame
  const canStop = selectedDevice === null && run.status === 'running';
  return (
    <div style={{ position: 'relative' }}>
      <CodeEditor
        key={run.image?.sourceImage.value}
        setEditorValue={setEditorValue}
        editorValue={editorValue}
        visible={addon === 'editor'}
        commands={(editor) => [
          {
            keybinding: editor.KeyMod.CtrlCmd | editor.KeyCode.Enter,
            handler: () => {
              if (refs.current.noAutoRun) {
                refs.current.runCode(refs.current.editorValue);
              }
            },
          },
        ]}
      />
      {addon === 'editor' && (
        <div style={{ position: 'absolute', bottom: 4, right: 16 }}>
          <div className="flex-row" style={{ gap: 0 }}>
            {noAutoRun && (
              <PlayStopButton
                canStop={canStop}
                onClick={() => {
                  if (canStop) {
                    stopCode();
                  } else {
                    runCode(editorValue);
                  }
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

function PlayStopButton(props: { canStop: boolean; onClick: () => void }) {
  const { canStop } = props;
  return (
    <button
      type="button"
      title={canStop ? 'Stop code' : 'Run code (Ctrl/Cmd + Enter)'}
      className={'editor-button-icon button--success'}
      onClick={props.onClick}
    >
      {canStop ? <HiOutlineStopCircle /> : <HiOutlinePlayCircle />}
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
