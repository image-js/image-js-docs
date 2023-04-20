// @ts-expect-error processed by webpack
// eslint-disable-next-line import/no-webpack-loader-syntax
import imageJSTypes from '!!raw-loader!../../../node_modules/image-js/dist-types/image-js.d.ts';
import { useColorMode } from '@docusaurus/theme-common';
import { Editor, Monaco, OnMount } from '@monaco-editor/react';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

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
  const monacoRef = useRef<Monaco | null>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(
        colorMode === 'dark' ? 'vs-dark' : 'vs-light',
      );
    }
  }, [colorMode]);
  function handleEditorDidMount(editor: EditorInstance, monaco: Monaco) {
    monaco.editor.setTheme(colorMode === 'dark' ? 'vs-dark' : 'vs-light');
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
    monacoRef.current = monaco;
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
