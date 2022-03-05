
//https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#install_and_activate_populating_your_cache


const localPath = "/WebApi/ServiceWorkers/SwTest/"

self.addEventListener('install', function (event) {
    event.waitUntil( //воркер не установится, если данный код не выполнится.
        caches.open(localPath+'v1').then(function (cache) {
            return cache.addAll([
                localPath,
                localPath + 'index.html',
                //localPath + 'style.css',
                localPath + 'app.js',
                localPath + 'app-stop.js',
                localPath + 'image-list.js',
                localPath + 'star-wars-logo.jpg',
                localPath + 'gallery/bountyHunters.jpg',
                localPath + 'gallery/myLittleVader.jpg',
                localPath + 'gallery/snowTroopers.jpg',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith( //перехватить наши HTTP-ответы и обновить их с помощью вашей собственной магии.

        caches.match(event.request).then(function (response) {
            //caches.match(event.request)позволяет нам сопоставить каждый ресурс, 
            //запрошенный из сети, с эквивалентным ресурсом, доступным в кеше

        if (response !== undefined) {
            //return response;
            //можем созать собственный ответ
            return new Response('Сервис воркер передает всем привет!');

        } else {
            return fetch(event.request).then(

                function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone(); 

                caches.open(localPath+'v1').then(function (cache) {
                    cache.put(event.request, responseClone); //записываем копию в кеш (будет перезаписываться)
                });
                return response;
                }).catch(function () {
                return caches.match(localPath + 'gallery/myLittleVader.jpg');
            });
        }
    }));
});

//очистка кеша при установке новой версии воркера
self.addEventListener('activate', (event) => {
    var cacheKeeplist = ['v2'];

    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
