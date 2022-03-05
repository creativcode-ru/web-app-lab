// Регистрация сервис-воркера

if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' }).then(function (reg) {
    navigator.serviceWorker.register('swTest.js').then(function (reg) {
        var msg;
        if (reg.installing) {
            msg = 'Service worker устанавливается';

        } else if (reg.waiting) {
            msg = 'Service worker уже установлен';
        } else if (reg.active) {
            msg = 'Service worker активен';
        }

        console.log(msg);
        showResult(msg);

    }).catch(function (error) {
        console.log('Регистрация не удалась ' + error);
    });
}

// загрузка изображения с сервера через XHR

function imgLoad(imgJSON) {
    // вернуть промис для загрузки изображения
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', imgJSON.url);
        request.responseType = 'blob';

        request.onload = function () {
            if (request.status == 200) {
                var arrayResponse = [];
                arrayResponse[0] = request.response;
                arrayResponse[1] = imgJSON;
                resolve(arrayResponse);
            } else {
                reject(Error('Картинка не может быть загружена:' + request.statusText));
            }
        };

        request.onerror = function () {
            reject(Error('Ошибка стевого соединения'));
        };

        // Send the request
        request.send();
    });
}


// отображение картинок
var imgSection = document.querySelector('section');

window.onload = function () {

    // загрузить каждый набор изображений, альтернативного текста, имени и подписи
    for (var i = 0; i <= Gallery.images.length - 1; i++) {
        imgLoad(Gallery.images[i]).then(function (arrayResponse) {

            var myImage = document.createElement('img');
            var myFigure = document.createElement('figure');
            var myCaption = document.createElement('p');
            var imageURL = window.URL.createObjectURL(arrayResponse[0]);

            myImage.src = imageURL;
            myImage.setAttribute('alt', arrayResponse[1].alt);
            myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by ' + arrayResponse[1].credit;

            imgSection.appendChild(myFigure);
            myFigure.appendChild(myImage);
            myFigure.appendChild(myCaption);

        }, function (Error) {
            console.log(Error);
        });
    }
};


// сообщение
function showResult(text) {
    document.querySelector("#output").innerHTML = text;
}