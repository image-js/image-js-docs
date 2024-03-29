const path = require('path');

const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

module.exports = function demoLoader(source) {
  const callback = this.async();
  const parsed = parser.parse(source, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });

  const IJSImport = {};
  traverse.default(parsed, {
    enter(node) {
      if (node.type === 'ImportDeclaration') {
        if (node.node.source.value !== 'image-js') {
          throw new Error(
            'demos must not import from anything else than image-js',
          );
        }
        for (let specifier of node.node.specifiers) {
          IJSImport[specifier.local.name] = specifier.imported.name;
        }
      }
    },
  });

  const body = parsed.program.body;
  const defaultExport = body.find(
    (node) => node.type === 'ExportDefaultDeclaration',
  );

  if (!defaultExport) {
    throw new Error('demos must export a default function');
  }

  const declarationBody = defaultExport.declaration.body;
  let processBody = source.slice(
    declarationBody.body[0].start,
    declarationBody.body[declarationBody.body.length - 1].end,
  );

  for (let key of Object.keys(IJSImport)) {
    processBody = processBody.replaceAll(
      new RegExp(`(^|[^a-zA-Z0-9])(${key})([^a-zA-Z0-9]|$)`, 'g'),
      (...m) => {
        return `${m[1]}IJS.${IJSImport[key]}${m[3]}`;
      },
    );
  }

  const isMask = this.resourcePath.endsWith('.mask.demo.tsx');

  const editorCode = `import * as IJS from 'image-js';
/**
 * Process the image
 * @param { IJS.${isMask ? 'Mask } mask' : 'Image } image'} the input image
 * @returns { IJS.Image | IJS.Mask } the processed image or mask
 */
export function process(${isMask ? 'mask' : 'image'}) {
  ${processBody}
}
  `;

  let imageDemoImportPath = path
    .relative(
      this.context,
      path.join('src', 'demo', 'components', 'ImageDemo.tsx'),
    )
    .replaceAll(path.sep, path.posix.sep);

  const depth = imageDemoImportPath.split('/').length - 1;
  if (depth === 0) {
    imageDemoImportPath = `./${imageDemoImportPath}`;
  }

  const modifiedSource = `
  import React from 'react';
  import ImageDemo from '${imageDemoImportPath}';

  function process(image, IJS) {
    ${processBody}
  }
  const name = '${this.resourcePath}';
  const code = \`${source}\`;
  const defaultEditorCode= \`${editorCode}\`;
  export default function Demo(props) {
    return (
      <ImageDemo code={code} defaultEditorCode={defaultEditorCode} processImage={process} name={name} isMask={${
        isMask ? 'true' : 'false'
      }} {...props} />
    );
  }
  `;

  babel
    .transformAsync(modifiedSource, {
      filename: this.resourcePath,
      presets: ['@babel/preset-typescript'],
    })
    .then((result) => {
      callback(null, result.code);
    })
    .catch((e) => callback(e));
};
