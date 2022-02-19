self.addEventListener("install", async event => {
    const cache = await caches.open("pwa-assets");
    // Кеширование производится при первой установке, если вручную удалить кеш, то приложение больше не сможет его обновить
    cache.addAll(["/", "index.html", "app.js", "style.css", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Progressive_Web_Apps_Logo.svg/640px-Progressive_Web_Apps_Logo.svg.png"]);
});

self.addEventListener("fetch", event => {
    console.log(`URL fetch: ${event.request.url}`); //SW обнаружил запрос от приложения в сеть

    event.respondWith(
        // для кеша это разные url: /serving/offline/ и /serving/offline/index.html ***
        caches.match(event.request).then(cachedResponse => {
            console.log(`cachedResponse: ${cachedResponse}`);
            if (cachedResponse === undefined) {
                console.log(`cachedResponse: ОШИБКА КЕША`); //надо перезапустить сервис-воркер... 
                return 
            }

            // It can update the cache to serve updated content on the next request
            return cachedResponse || fetch(event.request);
        }
        )
        //######## нет обработки ошибок - при удаленя кеша - перестает работать вообще
    )
});
