const localPath ="/WebApi/ServiceWorkers/SwTest/"

self.addEventListener('install', function (event) {
    event.waitUntil(
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
    event.respondWith(caches.match(event.request).then(function (response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
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