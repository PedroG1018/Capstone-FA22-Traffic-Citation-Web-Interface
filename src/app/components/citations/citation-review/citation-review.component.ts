import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IncomingMessage } from 'http';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';

@Component({
  selector: 'app-citation-review',
  templateUrl: './citation-review.component.html',
  styleUrls: ['./citation-review.component.css']
})
export class CitationReviewComponent implements OnInit {
  @Input() formSubmitted: boolean = false;
  @Input() violations: Violation[] = [];
  @Input() form!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  get citationInfo() {
    return this.form.get('citationInfo') as FormGroup;
  }

  get driverInfo() {
    return this.form.get('driverInfo') as FormGroup;
  }

  get officerInfo() {
    return this.form.get('officerInfo') as FormGroup;
  }

  // submitCitationForm() {
  //   this.formSubmitted = true;
  // }

}
