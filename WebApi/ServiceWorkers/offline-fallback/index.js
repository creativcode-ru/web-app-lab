/* Свойство controller интерфейса ServiceWorkerContainer возвращает объект ServiceWorker, 
 * в случае, если service worker активирован. 
 * Данное свойство возвращает null, если страница была обновлена с помощью Shift + refresh 
 * или на ней отсутствует активный service worker.
 */

if (navigator.serviceWorker.controller) {
    // A ServiceWorker controls the site on load and therefor can handle offline
    // fallbacks.
    debug(
        navigator.serviceWorker.controller.scriptURL +
        ' (onload)', 'controller'
    );
    debug(
        'An active service worker controller was found, ' +
        'no need to register'
    );
} else {
    // Register the ServiceWorker
    navigator.serviceWorker.register('service-worker.js', {
        scope: './'
    }).then(function (reg) {
        debug(reg.scope, 'register');
        debug('Service worker change, registered the service worker');
    });
}

// The refresh link needs a cache-busting URL parameter
document.querySelector('#refresh').search = Date.now();

// Debug helper
function debug(message, element, append) {
    var target = document.querySelector('#' + (element || 'log'));
    target.textContent = message + ((append) ? ('/n</br>' + target.textContent) : '');
}

// Allow for "replaying" this example
document.getElementById('clearAndReRegister').addEventListener('click',
    function () {
        navigator.serviceWorker.getRegistration().then(function (registration) {
            registration.unregister();
            window.location.reload();
        });
    }
);