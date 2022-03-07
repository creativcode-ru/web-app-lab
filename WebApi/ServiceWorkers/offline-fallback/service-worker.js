// [Working example](/serviceworker-cookbook/offline-fallback/).

let CACHE_NAME = 'offline-cache'
let OFFLINE = 'offline.html'
/* добавляем страницу через запрос из воркера
self.addEventListener('install', function (event) {
    // Добавляем в кеш страницу offline.html
    var offlineRequest = new Request(OFFLINE);
    event.waitUntil(
        fetch(offlineRequest).then(function (response) {
            return caches.open(CACHE_NAME).then(function (cache) {
                console.log('[oninstall] Cached offline page', response.url);
                return cache.put(offlineRequest, response);
            });
        })
    );
});
*/

// Загрузить один файл в кеш
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
            console.log('[install] Добавление файлов в кеш');
            return cache.add(OFFLINE);
            })
            .then(function () {
                console.log('[install] Необходимые ресурсы закешированы');
                return self.skipWaiting(); //*** воркер уже работает на текущей странице
            })
    );
});



self.addEventListener('fetch', function (event) {
    // Only fall back for HTML documents.
    var request = event.request;
    // && request.headers.get('accept').includes('text/html')
    if (request.method === 'GET') {
        // `fetch()` will use the cache when possible, to this examples
        // depends on cache-busting URL parameter to avoid the cache.
        event.respondWith(
            fetch(request).catch(function (error) {
                // fetch() дает ошибку, если нет соединения, 
                // но не в случаее http ошибок, даже `4xx` или `5xx`(это особенность именно fetch Api)
                // https://developer.mozilla.org/ru/docs/Web/API/Fetch_API#%D0%BE%D1%82%D0%BB%D0%B8%D1%87%D0%B8%D1%8F_%D0%BE%D1%82_jquery
                console.error(
                    '[onfetch] Failed. Serving cached offline fallback ' +
                    error
                );
                return caches.open(CACHE_NAME).then(function (cache) {
                    return cache.match(OFFLINE); //==> отправляем страничку из кеша
                });
            })
        );
    }
    // Any other handlers come here. Without calls to `event.respondWith()` the
    // request will be handled without the ServiceWorker.
});