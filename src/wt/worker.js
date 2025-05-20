import { parentPort } from 'worker_threads';

// Функция для вычисления n-го числа Фибоначчи
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    // Проверяем, что мы в контексте воркера
    if (!parentPort) {
        throw new Error('Этот файл должен быть запущен как воркер');
    }

    // Слушаем сообщения от основного потока
    parentPort.on('message', (n) => {
        try {
            // Вычисляем число Фибоначчи для полученного числа
            const result = nthFibonacci(n);
            // Отправляем результат обратно в основной поток
            parentPort.postMessage({ status: 'resolved', data: result });
        } catch (error) {
            // В случае ошибки отправляем объект с ошибкой
            parentPort.postMessage({ status: 'error', data: null });
        }
    });
};

// Запускаем обработку сообщений
sendResult();