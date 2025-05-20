import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {
        const fileContent = await readFile(filePath);
        const hash = createHash('sha256').update(fileContent).digest('hex');
        console.log(hash);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await calculateHash();