import { rename as renameFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = join(__dirname, 'files', 'properFilename.md');

    try {
        await access(oldPath);

        await renameFile(oldPath, newPath);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        if (error.code === 'EEXIST') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await rename();