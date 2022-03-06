// [Working example](/serviceworker-cookbook/offline-status/).

var CACHE_NAME = 'dependencies-cache';

// Файлы, необходимые для работы приложения в автономном режиме
var REQUIRED_FILES = [
    'random-1.png',
    'random-2.png',
    'random-3.png',
    'random-4.png',
    'random-5.png',
    'random-6.png',
    'index.html',
    'index.js',
    'app.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
];

// Шаг установки: загрузите каждый необходимый файл в кеш
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('[install] Добавление файлов в кеш');
                return cache.addAll(REQUIRED_FILES);
            })
            .then(function () {
                console.log('[install] Необходимые ресурсы закешированы');
                return self.skipWaiting();
            })
    );
});

//обрабатываем запросы пользователя
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Получен запрос - вернуть из кеша
                if (response) {
                    console.log('[fetch] возвращено из кеша сервис-воркера: ',
                        event.request.url);
                    return response;
                }

                //Если нет в кеше, получить с сервера
                console.log('[fetch] Получено с сервера: ', event.request.url);
                return fetch(event.request);
            }
            )
    );
});

// событие активации сервис воркера
self.addEventListener('activate', function (event) {
    console.log('[activate] ServiceWorker активирован!');

    // Calling claim() to force a "controllerchange" event on navigator.serviceWorker
    // Вызов Claim() для форсирования события «controllerchange» в navigator.serviceWorker
    // - событие передается в исходный код 
    console.log('[activate] уведомление от воркера!');
    event.waitUntil(self.clients.claim());
});