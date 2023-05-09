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
        colorMode === 'dark' ? 'vs-dark' : 'vs-light-modified',
      );
    }
  }, [colorMode]);
  function handleEditorDidMount(editor: EditorInstance, monaco: Monaco) {
    monaco.editor.defineTheme('vs-light-modified', {
      base: 'vs',
      inherit: true,
      rules: [{ token: '', background: '#FBFBFB' }],
      colors: {
        'editor.background': '#FBFBFB',
      },
    });
    monaco.editor.setTheme(
      colorMode === 'dark' ? 'vs-dark' : 'vs-light-modified',
    );
    function addCommand() {
      editor.addCommand(
        monaco.KeyMod.Alt | monaco.KeyCode.Space,
        () => {
          editor.trigger('', 'editor.action.triggerSuggest', '');
        },
        'editorTextFocus && !editorHasSelection && ' +
          '!editorHasMultipleSelections && !editorTabMovesFocus && ' +
          '!hasQuickSuggest',
      );
    }

    // This is a trick to prevent the command from being triggered on the wrong
    // editor when multiple editors are present on the page.
    // https://github.com/microsoft/monaco-editor/issues/2947
    editor.onDidFocusEditorText(() => {
      addCommand();
    });

    editorRef.current = editor;
  }
  function handleBeforeMount(monaco: Monaco) {
    const javascript = monaco.languages.typescript.javascriptDefaults;
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
