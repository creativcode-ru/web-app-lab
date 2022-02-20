
self.addEventListener("install", async event => {
    const cache = await caches.open("pwa-assets");
    // it stores all resources on first SW install
    cache.addAll(["index.html", "app.js", "style.css", "https://dog.ceo/api/breeds/image/random"]);
});

self.addEventListener("fetch", event => {
    console.log(`URL requested: ${event.request.url}`); //SW обнаружил запрос от приложения в сеть

   //event.respondWith() -- ответ SW на текущий запрос, обработка текущего запроса
    event.respondWith(
       //проверить наличие запроса в кеше https://developer.mozilla.org/ru/docs/Web/API/Cache/match
       // Если совпадений не найдено, Promise разрешается в undefined. (cachedResponse = undefined)
        caches.match(event.request).then(cachedResponse => {

            //текущий запрос клонируем для отправки в сеть в любом случае
            const networkFetch = fetch(event.request) //отправляем в сеть запрос, пришедший в SW (event.request)
                .then(response => {
                    // если запрос из сети пришел response!=undefined, обновляем кеш этим запросом
                    // сюда попадают и картинки, которые случайно меняютяся, это требует спечиальной обработки.

                    //console.log("=== ОТВЕТ СЕТИ ===");
                    //console.log(...response.headers);

                    caches.open("pwa-assets").then(cache => {
                        cache.put(event.request, response.clone()); 
                    });
                })
                .catch(console.log);

            // на первом месте стоит запрос из кеша, потом сетевой запрос
            return cachedResponse || networkFetch;
        }
        )
    )
});
