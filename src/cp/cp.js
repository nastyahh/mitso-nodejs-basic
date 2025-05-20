import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [join(__dirname, 'script.js'), ...args], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    });

    childProcess.on('error', (error) => {
        console.error('Ошибка в дочернем процессе:', error);
    });

    childProcess.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Дочерний процесс завершился с кодом ${code}`);
        }
    });

    return new Promise((resolve, reject) => {
        childProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Дочерний процесс завершился с кодом ${code}`));
            }
        });
    });
};


const args = process.argv.slice(2);

spawnChildProcess(args).catch(console.error);

export { spawnChildProcess };
