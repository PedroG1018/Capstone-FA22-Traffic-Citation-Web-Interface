// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const domain = require('auth_config.json').domain;
const clientId = require('auth_config.json').clientId;
const audience = require('auth_config.json').audience;
const apiUri = require('auth_config.json').apiUri;

export const environment = {
  production: false,
  //apiUrl: "https://traffic-citation-backend.herokuapp.com/api",
  apiUrl: "https://localhost:7190/api",
  auth: {
    domain,
    clientId,
    audience,
    apiUri,
    redirectUri: window.location.origin,
  },
};