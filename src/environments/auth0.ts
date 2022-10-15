import { domain, clientId } from '../../auth_config.json';
export const auth0 = {
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};
