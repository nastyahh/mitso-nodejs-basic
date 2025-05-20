import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const sourcePath = join(__dirname, 'files', 'fileToCompress.txt');
    const archivePath = join(__dirname, 'files', 'archive.gz');

    try {
        const readStream = createReadStream(sourcePath);
        const writeStream = createWriteStream(archivePath);
        const gzip = createGzip();

        readStream
            .pipe(gzip)
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

await compress();