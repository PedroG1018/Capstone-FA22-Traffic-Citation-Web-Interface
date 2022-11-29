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
}