// @ts-expect-error processed by webpack
// eslint-disable-next-line import/no-webpack-loader-syntax
import imageJSTypes from '!!raw-loader!../../../node_modules/image-js/dist-types/image-js.d.ts';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react';

import ImageFilter from '../filters/ImageFilter';
import { convertCodeToFunction } from '../filters/convertCodeToFunction';
import { useDebounce } from '../utils/useDebounce';

type EditorInstance = Parameters<OnMount>[0];

const defaultJsCode = `// @ts-check
import * as IJS from 'image-js';
/**
 * Process the image
 * @param { IJS.Image } image the input image
 * @returns { IJS.Image } the processed image
 */
export function process(image) {
    return image;
}`;

export default function ImageCodeEditor() {
  const [editorValue, setEditorValue] = useState(defaultJsCode);
  const debouncedEditorValue = useDebounce(editorValue, 1000);

  const customFunction = useMemo<
    { error: string; fn: null } | { error: null; fn: any }
  >(() => {
    try {
      const fn = convertCodeToFunction(debouncedEditorValue);
      return {
        fn,
        error: null,
      };
    } catch (e: any) {
      return {
        fn: null,
        error: e.message,
      };
    }
  }, [debouncedEditorValue]);

  return (
    <>
      <MonacoEditor setEditorValue={setEditorValue} />
      {customFunction.error ? (
        <div>{customFunction.error}</div>
      ) : (
        <ImageFilter processImage={customFunction.fn} code={editorValue} />
      )}
    </>
  );
}

function MonacoEditor(props: {
  setEditorValue: Dispatch<SetStateAction<string>>;
}) {
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: EditorInstance) {
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
      height="300px"
      defaultLanguage="javascript"
      defaultValue={defaultJsCode}
      onMount={handleEditorDidMount}
      beforeMount={handleBeforeMount}
      onChange={(editorValue) => {
        if (editorValue) {
          props.setEditorValue(editorValue);
        }
      }}
    />
  );
}
