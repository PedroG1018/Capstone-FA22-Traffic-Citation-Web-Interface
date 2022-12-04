import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isDark: boolean = false;

  constructor(public auth: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    this.isDark = this.storage.darkMode == 'darkModeOn' ? true : false;
  }

  toggleDarkMode() {
    if (this.isDark) {
      this.storage.darkMode = 'darkModeOn';
    } else {
      this.storage.darkMode = 'darkModeOff';
    }
  }
}