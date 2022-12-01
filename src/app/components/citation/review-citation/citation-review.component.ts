import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Violation } from 'src/app/models/violation';

@Component({
  selector: 'app-citation-review',
  templateUrl: './citation-review.component.html',
  styleUrls: ['./citation-review.component.css']
})
export class CitationReviewComponent {
  @Input() formSubmitted: boolean = false;
  @Input() violations: Violation[] = [];
  @Input() form!: FormGroup;

  constructor() {
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
}
