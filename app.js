window.addEventListener("DOMContentLoaded", async event => {
    checkRegistration(); //Проверить статус регистраии SW

    document.querySelector("#register").addEventListener("click", register); 
    document.querySelector("#unregister").addEventListener("click", unregister);

});
/* DOMContentLoaded https://developer.mozilla.org/ru/docs/Web/API/Window/DOMContentLoaded_event
 Событие DOMContentLoaded происходит когда весь HTML был полностью загружен и пройден парсером, 
 не дожидаясь окончания загрузки таблиц стилей, изображений и фреймов. 
 Значительно отличающееся от него событие load используется для отслеживания только полностью загруженной страницы.
 
 Если вы хотите чтобы DOM был пройден парсером насколько возможно быстро, 
 сразу после запроса пользователем страницы, вы можете попробовать 
 выполнять JavaScript асинхронно и оптимизировать загрузку таблиц стилей 
 которые обычно замедляют загрузку документа поскольку загружаясь одновременно "крадут" трафик у основного документа.
 */

// Проверить статус регистраии SW
async function checkRegistration() {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
            showResult("Сервисный работник зарегистрирован при загрузке страницы")
        } else {
            showResult("Сервисный работник сейчас не зарегистрирован")
            //Почему мой сервисный работник не может зарегистрироваться? https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
        }
    } else {
        showResult("Браузер не поддерживает сервисного работника");
    }
}

// Регистрируем сервис-воркер
async function register() {
    if ('serviceWorker' in navigator) {
        try {
            // Измените URL сервисного работника, чтобы увидеть, что происходит, когда SW.js не существует.t
            const registration = await navigator.serviceWorker.register("sw.js");
            showResult("Сервисный работник зарегистрирован");

        } catch (error) {
            showResult("Ошибка при регистрации: " + error.message);
        }
    } else {
        showResult("API сервис-воркеров недоступен");
    }
};
/*
 */


// Отмена регистрации сервис-воркера
async function unregister() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                const result = await registration.unregister();
                showResult(result ? "Регистрация сервисного работника отменена" : "Не удалось отменить регистрацию сервисного работника.");
            } else {
                showResult("Нет зарегистрированного сервисного работника");
            }

        } catch (error) {
            showResult("Ошибка при отмене регистрации: " + error.message);
        }
    } else {
        showResult("API сервис-воркеров недоступен");
    }
};


// Отображение результата
function showResult(text) {
    document.querySelector("output").innerHTML = text;
}

