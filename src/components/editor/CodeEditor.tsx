// @ts-expect-error processed by webpack
// eslint-disable-next-line import/no-webpack-loader-syntax
import imageJSTypes from '!!raw-loader!../../../node_modules/image-js/dist-types/image-js.d.ts';
import { Editor, Monaco, OnMount } from '@monaco-editor/react';
import React, { Dispatch, SetStateAction, useRef } from 'react';

type EditorInstance = Parameters<OnMount>[0];

export default function CodeEditor(props: {
  setEditorValue: Dispatch<SetStateAction<string>>;
  editorValue: string;
  visible?: boolean;
}) {
  const { editorValue, setEditorValue, visible } = props;
  if (!visible) {
    return null;
  }

  return <MonacoEditor value={editorValue} setValue={setEditorValue} />;
}

function MonacoEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: EditorInstance, monaco: Monaco) {
    editor.addCommand(
      monaco.KeyMod.Alt | monaco.KeyCode.Space,
      () => {
        editor.trigger('', 'editor.action.triggerSuggest', '');
      },
      'editorTextFocus && !editorHasSelection && ' +
        '!editorHasMultipleSelections && !editorTabMovesFocus && ' +
        '!hasQuickSuggest',
    );
    editorRef.current = editor;
  }
  function handleBeforeMount(monaco: Monaco) {
    const javascript = monaco.languages.typescript.javascriptDefaults;
    // @ts-expect-error raw-loader loads a string
    javascript.addExtraLib(imageJSTypes, 'image-js.d.ts');

    javascript.setDiagnosticsOptions({
      // Makes sur typescript errors get reported in the editor
      noSemanticValidation: false,
    });

    javascript.setCompilerOptions({
      ...javascript.getCompilerOptions(),
      strict: true,
      checkJs: true,
      paths: {
        'image-js': ['./image-js'],
      },
    });
  }
  return (
    <Editor
      options={{
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
      }}
      height={Math.min(value.split('\n').length * 18, 250)}
      className="code-editor"
      defaultLanguage="javascript"
      defaultValue={value}
      onMount={handleEditorDidMount}
      beforeMount={handleBeforeMount}
      onChange={(editorValue) => {
        if (editorValue) {
          setValue(editorValue);
        }
      }}
    />
  );
}
