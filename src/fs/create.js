import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(filePath, content, { flag: 'wx' });
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await create();