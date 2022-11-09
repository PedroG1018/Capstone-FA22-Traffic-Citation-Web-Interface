const domain = require('auth_config.json').domain;
const clientId = require('auth_config.json').clientId;
const apiUrl = require('auth_config.json').apiUrl;

export const environment = {
  production: true,
  apiUrl: "https://traffic-citation-backend.herokuapp.com/api",
  //apiUrl: "https://localhost:7190/api"
  auth: {
    domain,
    clientId,
    apiUrl,
    redirectUri: window.location.origin,
  },
};
