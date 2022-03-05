window.addEventListener("DOMContentLoaded", async event => {
    document.querySelector("#btStop").addEventListener("click", appStop);
});

function appStop() {
    deleteCache('/WebApi/ServiceWorkers/SwTest/v1');
    unregister();
}

//удаление кеша
async function deleteCache(cacheName) {
    if ('caches' in window) {
        await caches.delete(cacheName);
        showResult(cacheName + " кеш удален");
    } else {
        showResult("Хранилище кеша не поддерживается.");
    }
}

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

