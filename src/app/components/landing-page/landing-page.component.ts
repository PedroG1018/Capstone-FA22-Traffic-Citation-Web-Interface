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
  redirectLogin() {
    this.isLoggedIn();
    window.location.href = 'https://localhost:4200/login';
    // heroku window.location.href = 'https://traffic-citation-frontend.herokuapp.com/login';
  }

  // Creat a check to see if the user is logged in and hide the login button
  // if the user is logged in
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

}
