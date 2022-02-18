// (c) https://glitch.com/embed/#!/learn-pwa-asset-caching?path=index.html%3A34%3A7
// оживляем кнопки
window.addEventListener("DOMContentLoaded", async event => {
    document.querySelector("#single").addEventListener("click", cacheSingleFile);
    document.querySelector("#multiple").addEventListener("click", cacheMultipleFiles);
    document.querySelector("#delete").addEventListener("click", deleteCache);

});

// Добавить один URL в кеш
async function cacheSingleFile() {
    const cacheName = document.querySelector("#cacheName").value; //название задается на странице
    if ('caches' in window) {
        try {
            const cache = await caches.open(cacheName);
            //await cache.add("app.js") //dummy.json - json не загружается, кодировка русского языка портится ########################
            //await cache.add(new Request('app.js'))

            /* не удается прочитать json ################
            const options = {
                headers: {
                    'dataType': 'json',
                    'Content-Type': 'application/json'
                }
            }
            const jsonResponse = new Response('dummy.json', options);
            await cache.add(jsonResponse)
            */

            /*
            const options = {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                }
            }
            await cache.add(new Response('app.js'))
            */

            showResult("dummy.json кеширован в " + cacheName);

        } catch (error) {
            showResult("Ошибка при кешировании одиночного файла " + error.message);
        }
    } else {
        showResult("Хранилище кеша не поддерживается.");
    }
};

// Добавить несколько URL в кеше
/*
 
 */
async function cacheMultipleFiles() {
    const cacheName = document.querySelector("#cacheName").value;
    if ('caches' in window) {
        try {
            const cache = await caches.open(cacheName);
            const urlsToCache = ["./", "dummy.css", "dummy.html", //"dummy.json",
                "https://cdn.glitch.me/606fe2ae-f386-47d3-9892-c6d18ca17998%2F9b775a52-d700-4208-84e9-18578ee75266_icon.jpeg?v=1637764108088",
                "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"]
            await cache.addAll(urlsToCache);
            showResult(urlsToCache.length + " файлов помещены в кеш " + cacheName);

        } catch (error) {
            showResult("Ошибка при кешировании нескольких файлов " + error.message);
        }
    } else {
        showResult("Хранилище кеша не поддерживается.");
    }
};

//удаление кеша
async function deleteCache() {
    const cacheName = document.querySelector("#cacheName").value;
    if ('caches' in window) {
        await caches.delete(cacheName);
        showResult(cacheName + " кеш удален");
    } else {
        showResult("Хранилище кеша не поддерживается.");
    }
}

// Отображение сообщения
function showResult(text) {
    document.querySelector("output").innerHTML = text;
}
