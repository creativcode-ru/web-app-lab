// Registers a service worker
async function register() {
    if ('serviceWorker' in navigator) {
        try {
            // Change the service worker URL to see what happens when the SW doesn't exist
            const registration = await navigator.serviceWorker.register("sw.js");
            showResult("Service worker registered");

        } catch (error) {
            showResult("Error while registering: " + error.message);
        }
    } else {
        showResult("Service workers API not available");
    }
};

register(); //.....?????

function showResult(text) {
    document.querySelector("output").innerHTML = text;
}