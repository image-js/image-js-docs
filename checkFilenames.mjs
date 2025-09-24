import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

function getAllFiles(dirPath) {
  let incorrectFormatFiles = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const filenameFormat = /^[a-z0-9]+(?:[-.][a-z0-9]+)*$/;

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

    if (!filenameFormat.test(nameToTest)) {
      incorrectFormatFiles.push(path.join(dirPath, entry.name));
    }

    // Recursively check subdirectories
    if (entry.isDirectory()) {
      const subDirResults = getAllFiles(path.join(dirPath, entry.name));
      incorrectFormatFiles = incorrectFormatFiles.concat(subDirResults);
    }
  }

  return incorrectFormatFiles;
}

const folders = ['docs', 'blog'];

for (const folder of folders) {
  const folderPath = path.join(__dirname, folder);
  const incorrectFormatFiles = getAllFiles(folderPath);
  if (incorrectFormatFiles.length !== 0) {
    throw new Error(
      `Files with incorrect filename format found:\n${incorrectFormatFiles.join('\n')}`,
    );
  }
}
console.log('All files have passed the check.');
