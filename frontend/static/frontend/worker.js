self.addEventListener('message', function(e) {
    var data = e.data;
    self.postMessage(data);
}, false);

navigator.serviceWorker.register('sw.js')
.then(function(sw) {
    serviceWorkerRegistration = sw;
    initPush();
})
.catch(function(error) {
    console.error('Service Worker Error', error);
});