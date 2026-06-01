import fs from 'fs';
import path from 'path';

export function removeFile(filePath: string) {
  if (!filePath) return;

  const absolutePath = path.join(__dirname, '..', '..', '..', filePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) return;

    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error('Error removing file:', err);
      }
    });
  });
}
