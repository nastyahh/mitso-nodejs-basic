import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const archivePath = join(__dirname, 'files', 'archive.gz');
    const targetPath = join(__dirname, 'files', 'fileToCompress.txt');

    try {
        const readStream = createReadStream(archivePath);
        const writeStream = createWriteStream(targetPath);
        const gunzip = createGunzip();

        readStream
            .pipe(gunzip)
            .pipe(writeStream);

        return new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', () => reject(new Error('FS operation failed')));
            readStream.on('error', () => reject(new Error('FS operation failed')));
        });
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await decompress();