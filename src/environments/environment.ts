// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:5000/api',
  internalApiUrl: 'http://localhost:5000/api/internal',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_MANAGER: 'ROLE_MANAGER',
  ROLE_CASHIER: 'ROLE_CASHIER',
  ROLE_STYLIST: 'ROLE_STYLIST',
  firebase: {
    apiKey: "AIzaSyAl3s_hpG7tW4fXHOaGB67AaW-cdIw-vAg",
    authDomain: "sms-fe.firebaseapp.com",
    databaseURL: "https://sms-fe.firebaseio.com",
    projectId: "sms-fe",
    storageBucket: "sms-fe.appspot.com",
    messagingSenderId: "873499124708",
    appId: "1:873499124708:web:efb933c8313929b2131df1",
    measurementId: "G-35BFF1GZBJ"
  },
  pageSize: 5,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
