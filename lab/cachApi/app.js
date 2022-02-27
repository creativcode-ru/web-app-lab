// подключаем кнопки
window.addEventListener("DOMContentLoaded", async event => {
    document.querySelector("#btNet").addEventListener("click", fromNet);
    //document.querySelector("#btCache").addEventListener("click", fromCache);
   /* document.querySelector("#delete").addEventListener("click", deleteCache);*/
});

const DOG_API = "https://dog.ceo/api/breeds/image/random"; //анонимное api случайных картинок собак. Для тестирования
const CACHE_NAME = "dog.ceo/api/breeds/image/random";

/* Прочитать данные из внешнего Api 
 */
async function fromNet() {
    //Использование Fetch Api https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch

    //document.getElementById("dogImg").src = "";//TEST: удаляю чтобы видеть загрузку каринки

    fetch(DOG_API)
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.json(); //ждем, и получаем файл из сети, он передается дальше в следующий .then
            } else {
                let error = new Error(res.statusText);
                error.response = res; //...
                throw error
            }
            if (!res.ok) {
                throw new Error('Ответ сети был не ok.');
            }
           
        })
        .then((data) => { //затем обрабатываем полученные json данные
            DataProcessing(data.message);
        })
        .catch((e) => {
            showResult("Ошибка запроса: " + e.message);
            console.log("Ошибка запроса: " + e.res);
        });
}


function DataProcessing(data) {
       //отобразить картинку
    var dogImg = document.getElementById("dogImg").src = data; //получаем только имя картинки, сама картинка грузится браузером автоматически, при изменеии src

    deleteCache(CACHE_NAME); //полное удаление кеша, чтобы картинки не крпились до бесконечности)
    cacheSingleImage(data); //добавляем картинку в кеш
    //showResult("Новая картинка: " + data);
}

async function deleteCache(cacheName) {
    if ('caches' in window) {
        try {
            caches.delete(cacheName).then(function (ex) { // https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete
                if (ex) console.log("кеш " + cacheName + " удален");
                else console.log("кеш " + cacheName + " не существует");
            });

            //await caches.delete(cacheName); //caches -- удаляет весь кеш по имени. Метод CacheStorage
            //полная очистка всех кешей https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete

           
        } catch (error) {
            console.log("Ошибка при удалении кеша" + cacheName + " ==> " + error.message);
    }
    } else {
        showResult("Хранилище кеша не поддерживается.");
    }
}


//Добавляем картинку в кеш, без обращения к сети
async function cacheSingleImage(imgUrl) {
    if ('caches' in window) {
        try {
            const cache = await caches.open(CACHE_NAME);
            await cache.add(imgUrl);
            showResult("файл " + imgUrl + "кеширован в " + cacheName);
        } catch (error) {
            showResult("Ошибка кеширования " + error.message);
        }
    }  else {
        showResult("Хранилище кеша не поддерживается.");
    }
}

function showResult(text) {
    document.querySelector("output").innerHTML = text;
}

