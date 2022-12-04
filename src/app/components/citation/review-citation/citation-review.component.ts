import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Citation } from 'src/app/models/citation';
import { Violation } from 'src/app/models/violation';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-citation-review',
  templateUrl: './citation-review.component.html',
  styleUrls: ['./citation-review.component.css']
})
export class CitationReviewComponent {
  @Input() formSubmitted: boolean = false;
  @Input() citation: Citation = new Citation();
  @Input() violations: Violation[] = [];
  @Input() form!: FormGroup;

  constructor(public auth: AuthService) {
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
