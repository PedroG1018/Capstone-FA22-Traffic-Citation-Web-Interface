import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TrafficCitation.UI';

  intervalSub;
  
  constructor() {}

  ngOnInit() : void {
    this.intervalSub = setInterval(() => {
      console.log('Hello from ngOnInit');
    }, 1000);
  }

  ngOnDestroy(): void {
      if (this.intervalSub) {
        clearInterval(this.intervalSub);
      }
  }
}
