import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // Use the button to redirect to the login page
  redirectLogin() {
    window.location.href = 'http://localhost:8080/login';
    // heroku window.location.href = 'https://traffic-citation-frontend.herokuapp.com/login';
  }

  // Creat a check to see if the user is logged in and hide the login button
  // if the user is logged in
  ifLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

}
