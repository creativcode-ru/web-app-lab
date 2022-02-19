
self.addEventListener("fetch", event => {
    console.log(`URL requested: ${event.request.url}`); //SW обнаружил запрос от приложения в сеть
    //return; //игнорируем запрос и он отправляется в сеть

    //формируем собственный ответ, вместо ответа сети
    const options = {
        status: 200,
        headers: {
            'Content-type': 'text/html'
        }
    };
    const htmlResponse = new Response(`
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Service Worker Serving Demo</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <b>Ответ создан Service Worker</b>
    <p>вместо исходной страницы ${event.request.url} <br />работает без сети.</p>
 </body>
</html>
    `, options);

    event.respondWith(htmlResponse); //этот ответ SW подменяет исходный.

})

