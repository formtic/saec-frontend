let intervalId = null;

let loadingBar = null;

export function registerLoadingBar(instance) {
    loadingBar = instance;
}

export function startLoop() {
    if(!loadingBar || intervalId !== null) return;

        intervalId = setInterval(() => {
            loadingBar.start();
            setTimeout(() => {
                loadingBar.finish();
            }, 500);
        }, 500);
}

export function stopLoop() {
    if(!loadingBar) return;
    clearInterval(intervalId);
    intervalId = null;
    loadingBar.finish();
}