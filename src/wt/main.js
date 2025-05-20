import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    // Получаем количество логических ядер процессора
    const numCPUs = cpus().length;
    const results = [];

    // Создаем массив промисов для каждого воркера
    const workerPromises = Array.from({ length: numCPUs }, (_, index) => {
        return new Promise((resolve) => {
            // Создаем воркер
            const worker = new Worker(join(__dirname, 'worker.js'));

            // Отправляем число в воркер (начиная с 10)
            const number = 10 + index;
            worker.postMessage(number);

            // Обрабатываем результат от воркера
            worker.on('message', (result) => {
                resolve(result);
            });

            // Обрабатываем ошибки воркера
            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });

            // Обрабатываем завершение воркера
            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        });
    });

    // Ждем завершения всех воркеров
    const workerResults = await Promise.all(workerPromises);

    // Выводим результаты в консоль
    console.log(workerResults);

    return workerResults;
};

await performCalculations();