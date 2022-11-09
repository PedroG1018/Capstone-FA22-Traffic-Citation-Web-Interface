import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';
import { Unsubscriber } from 'src/app/services/unsubscriber';

@Component({
  selector: 'app-view-citation-summary',
  templateUrl: './view-citation-summary.component.html',
  styleUrls: ['./view-citation-summary.component.css'],
})
export class ViewCitationSummaryComponent
  extends Unsubscriber
  implements OnInit
{
  @Input() citation?: Citation;
  @Input() violations?: Violation[];
  @Input() driver?: Driver;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  // retrieveSessionValues() {
  //   // Parse JSON string from session storage as Citation
  //   if (sessionStorage.getItem('citation')) {
  //     this.citation = JSON.parse(
  //       sessionStorage.getItem('citation') || '{}') as Citation;
  //   }

  //   if (sessionStorage.getItem('violations')) {
  //     this.violations = JSON.parse(sessionStorage.getItem('violations') || '{}') as Violation[];
  //   }

  //   if (sessionStorage.getItem('driver')) {
  //     this.driver = JSON.parse(sessionStorage.getItem('driver') || '{}') as Driver;
  //   }
  // }
}
