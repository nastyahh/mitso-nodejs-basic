import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, 'files', 'fileToWrite.txt');

    try {
        const writeStream = createWriteStream(filePath, { flags: 'w' });

        process.stdin.setEncoding('utf-8');

        process.stdin.on('data', (chunk) => {
            writeStream.write(chunk);
        });

        process.stdin.on('end', () => {
            writeStream.end();
        });

        writeStream.on('error', () => {
            throw new Error('FS operation failed');
        });

    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await write();