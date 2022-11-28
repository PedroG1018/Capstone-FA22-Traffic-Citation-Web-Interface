const domain = require('auth_config.json').domain;
const clientId = require('auth_config.json').clientId;
const audience = require('auth_config.json').audience;
const apiUri = require('auth_config.json').apiUri;

// Production (this is used for heroku)

export const environment = {
  production: true,
  apiUrl: "https://traffic-citation-backend.herokuapp.com/api",
  auth: {
    domain,
    clientId,
    audience,
    apiUri,
    redirectUri: window.location.origin
  },
};
