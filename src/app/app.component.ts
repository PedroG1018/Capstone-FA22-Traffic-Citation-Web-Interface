import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TrafficCitation.UI';

  intervalSub;

  toggleDarkMode = new FormControl(false);
  @HostBinding('class') className = '';
  
  constructor(public auth: AuthService, private overlay: OverlayContainer) {}

  ngOnInit() : void {
    this.intervalSub = setInterval(() => {
      console.log('Hello from ngOnInit');
    }, 1000);

    this.toggleDarkMode.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  ngOnDestroy(): void {
      if (this.intervalSub) {
        clearInterval(this.intervalSub);
      }
  }
}
