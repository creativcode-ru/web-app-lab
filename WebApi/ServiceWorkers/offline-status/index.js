/*
 После регистрации, воркер работает в отдельном потоке.
 Из своего потока воркер пернедает сообщение в даный поток с помощью генерации сообщения [controllerchange]
 */



// Регистрация срвис воркера
navigator.serviceWorker.register('service-worker.js', {
    scope: '.'
}).then(function (registration) {
    console.log('Сервис воркер зарегистрирован ', registration);
});

// Прослушивание событий воркера
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/oncontrollerchange
// событие [controllerchange] происходит, когда воркер получает новый active рабочий процесс
// это событие надо активировать внутри сервис воркера
navigator.serviceWorker.addEventListener('controllerchange', function (event) {
    console.log(
        '[controllerchange] Произошло событие сервис-воркера "controllerchange": ', event
    );

    // Наблюдение за изменением состояния воркера
    navigator.serviceWorker.controller.addEventListener('statechange',
        function () {
            //Обработчик события, вызываемый при срабатывании события statechange;
            console.log('[controllerchange][statechange] ' +
                'Произошло изменение состояния "statechange": ', this.state
            );

            // Если воркер в состоянии "activated", сообщить пользователю, что можно работать автономно!
            if (this.state === 'activated') {
                // Отобразить уведомление
                document.getElementById('offlineNotification')
                    .classList.remove('d-none');
            }
        }
    );
});