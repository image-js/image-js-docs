const { readFileSync } = require('node:fs');
const path = require('path');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse');

function demoLoader() {
  const source = readFileSync(
    './src/components/filters/grey.filter.ts',
    'utf8',
  );
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

  debugger;

  const declarationBody = defaultExport.declaration.body;
  let processBody = source.slice(
    declarationBody.body[0].start,
    declarationBody.body[declarationBody.body.length - 1].end,
  );

  for (let key of Object.keys(IJSImport)) {
    processBody = processBody.replaceAll(
      new RegExp(`(^|[^a-zA-Z0-9])(${key})([^a-zA-Z0-9])`, 'g'),
      (...m) => {
        return `${m[1]}IJS.${key}${m[3]}`;
      },
    );
  }

  const editorCode = `import * as IJS from 'image-js';
/**
 * Process the image
 * @param { IJS.Image } image the input image
 * @returns { IJS.Image } the processed image
 */
export function process(image) {
  ${processBody}
}
  `;

  console.log(editorCode);
}

demoLoader();
