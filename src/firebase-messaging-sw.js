importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyAl3s_hpG7tW4fXHOaGB67AaW-cdIw-vAg",
    authDomain: "sms-fe.firebaseapp.com",
    databaseURL: "https://sms-fe.firebaseio.com",
    projectId: "sms-fe",
    storageBucket: "sms-fe.appspot.com",
    messagingSenderId: "873499124708",
    appId: "1:873499124708:web:efb933c8313929b2131df1",
    measurementId: "G-35BFF1GZBJ"
});
const messaging = firebase.messaging();