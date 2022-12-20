importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
    apiKey: 'AIzaSyAEkpprR8z-ZBzNjhex6K9zBcEzJQdf8HA',
    appId: '1:105134035805:web:f27a47ba165bc990910eb4',
    databaseURL: "https://promosysnotification.firebaseio.com",
    messagingSenderId: '105134035805',
    projectId: 'promosysnotification',
    authDomain: 'promosysnotification.firebaseapp.com',
    storageBucket: 'promosysnotification.appspot.com',
    measurementId: 'G-V6HD792DYJ',
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});