import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: 'AUMp2619jwCfVNLdeW6uRSTJUt3wQk01',
    domain: 'dev-3k36-3cg.us.auth0.com',
    responseType: 'token id_token',
    audience: 'https://dev-3k36-3cg.us.auth0.com/userinfo',
    redirectUri: 'http://localhost:8080/home',
    scope: 'openid'
  });

  constructor() {}

  public login(): void {
    this.auth0.authorize();
  }
}
