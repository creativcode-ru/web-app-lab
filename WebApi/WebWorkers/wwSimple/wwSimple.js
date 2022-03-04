onmessage = function (e) {
    console.log('Worker: Получено сообщение из main.js');
    const result = e.data[0] * e.data[1];
    if (isNaN(result)) {
        postMessage('Введите два номера');
    } else {
        const workerResult = 'Результат: ' + result;
        console.log('Worker: Отправить сообщение обратно в main.js');
        postMessage(workerResult);
    }
}