
window.addEventListener("DOMContentLoaded", event => {
    document.querySelector("#reload").addEventListener("click", event => {
        location.reload();
    });
    document.querySelector("#check").addEventListener("click", checkImage);

    registerSW();
    loadMessage();
    loadMessage();
});



// Registers a service worker
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            // Change the service worker URL to see what happens when the SW doesn't exist
            const registration = await navigator.serviceWorker.register("swRevalidate.js");
        } catch (error) {
            showResult("Error while registering: " + error.message);
        }
    } else {
        showResult("Service workers API not available");
    }
};

// Запрашиваем данные из сети
async function loadMessage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const value = await response.json();
    showResult("Ответ: " + value.message);
}


async function checkImage() {
    const cache = await caches.open("pwa-assets");
    const result = await cache.match("https://dog.ceo/api/breeds/image/random"); //читаем из кеша

    if (result) {
        const value = await result.json();
        document.getElementById("dogImg").src = value.message; //это приведет к кешировании картинки - все запросы кешируются

        showResult("Кешированное сообщение: " + value.message);
    } else {
        showResult("Нет кешированных картинок");
    }
}

function showResult(text) {
    document.querySelector("output").innerHTML = text;
}