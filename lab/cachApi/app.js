// подключаем кнопки
window.addEventListener("DOMContentLoaded", async event => {
    document.querySelector("#btNet").addEventListener("click", fromNet);
    document.querySelector("#btCache").addEventListener("click", fromCache);
   /* document.querySelector("#delete").addEventListener("click", deleteCache);*/
});

const DOG_API ="https://dog.ceo/api/breeds/image/random";

async function fromNet() {
    //Использование Fetch Api https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch

    //document.getElementById("dogImg").src = "";//удаляю чтобы видеть загрузку каринки

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
            document.getElementById("dogImg").src = data.message; 
            showResult("Загружена картинка: " + data.message);
        })
        .catch((e) => {
            showResult("Ошибка запроса: " + e.message);
            console.log("Ошибка запроса: " + e.res);
        });
}

function showResult(text) {
    document.querySelector("output").innerHTML = text;
}