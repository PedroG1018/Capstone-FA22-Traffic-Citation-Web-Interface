import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TrafficCitation.UI';
  intervalSub;

  isDark: boolean = false;
  @HostBinding('class') className = '';
  
  constructor(public auth: AuthService, private overlay: OverlayContainer, @Inject(DOCUMENT) private doc: Document) {}


  ngOnInit() : void {
    this.intervalSub = setInterval(() => {
      console.log('Hello from ngOnInit');
    }, 1000);

    if (localStorage.getItem('darkMode') == 'true') {
      this.className = 'darkMode';
      this.overlay.getContainerElement().classList.add(this.className);
      this.isDark = true;
      
    } else {
      this.className = '';
      this.overlay.getContainerElement().classList.remove('darkMode');
      this.isDark = false;
    }
  }

  toggleDarkMode() {
    const darkClassName = 'darkMode';
    this.className = this.isDark ? darkClassName : '';
    
    if (this.isDark) {
      this.overlay.getContainerElement().classList.add(darkClassName);
      localStorage.setItem('darkMode', 'true');
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      localStorage.setItem('darkMode', 'false');
    }
  }

  ngOnDestroy(): void {
      if (this.intervalSub) {
        clearInterval(this.intervalSub);
      }
  }
  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}