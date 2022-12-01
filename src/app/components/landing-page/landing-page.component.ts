import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  // Use the button to redirect to the login page
  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
    this.isLoggedIn();
  }

  // Create a check to see if the user is logged in
  // Hide the login button if the user is logged in
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
