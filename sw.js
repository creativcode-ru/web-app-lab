/*
 Область #
Папка, в которой находится ваш сервис-воркер, определяет его область действия.
Service Worker, который живет по адресу, example.com/my-pwa/sw.js
может контролировать любую навигацию по пути my-pwa или ниже,
например example.com/my-pwa/demos/.
Сервисные работники могут управлять только элементами (страницами, работниками, совместно «клиентами») в своей области.
Область действия применяется к вкладкам браузера и окнам PWA.

Допускается только один сервис-воркер на область действия.
Когда активен и работает, обычно доступен только один экземпляр, независимо от того,
сколько клиентов находится в памяти (например, окна PWA или вкладки браузера).

https://web.dev/learn/pwa/service-workers/

Область действия можно указать при регистрации сервисного работника:
navigator.serviceWorker.register('./sw-test/sw.js', {scope: './sw-test/'})
- для этого надо указать второй параметр.

Использование сервис-воркеров: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

Почему мой сервисный работник не может зарегистрироваться? https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

 */

console.log("Привет, это Service Worker");

// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("Service worker installed");
});
self.addEventListener("activate", event => {
    console.log("Service worker activated");
});