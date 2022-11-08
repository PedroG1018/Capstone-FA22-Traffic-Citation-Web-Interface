// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const domain = require('auth_config.json').domain;
const clientId = require('auth_config.json').clientId;
const apiUrl = require('auth_config.json').apiUrl;

export const environment = {
  production: false,
  //apiUrl: "https://traffic-citation-backend.herokuapp.com/api",
  apiUrl: "https://localhost:7190/api",
  auth: {
    domain,
    clientId,
    apiUrl,
    redirectUri: window.location.origin,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
