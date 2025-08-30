import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllFiles(dirPath) {
  let nonKebabElements = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  for (const entry of entries) {
    // Skip certain files/folders
    if (
      entry.name === '.DS_Store' ||
      entry.name === 'images' ||
      entry.name === 'demos' ||
      entry.name === '_category_.json'
    ) {
      continue;
    }

    // Get the name without extension for files, or full name for directories
    const nameToTest = entry.isFile()
      ? path.parse(entry.name).name
      : entry.name;

    if (!kebabCaseRegex.test(nameToTest)) {
      nonKebabElements.push(path.join(dirPath, entry.name));
    }

    // Recursively check subdirectories
    if (entry.isDirectory()) {
      const subDirResults = getAllFiles(path.join(dirPath, entry.name));
      nonKebabElements = nonKebabElements.concat(subDirResults);
    }
  }

  return nonKebabElements;
}

const folders = ['docs', 'blog'];

for (const folder of folders) {
  const folderPath = path.join(__dirname, folder);
  const nonKebabFiles = getAllFiles(folderPath);
  if (nonKebabFiles.length !== 0) {
    throw new Error(`Non-kebab-case files found:\n${nonKebabFiles.join('\n')}`);
  }
}
console.log('All files have passed the check.');
