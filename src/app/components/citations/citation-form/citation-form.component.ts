import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Citation } from 'src/app/models/citation';
import { CitationWithViolations } from 'src/app/models/citation-with-violations';
import { Violation } from 'src/app/models/violation';

@Component({
  selector: 'app-citation-form',
  templateUrl: './citation-form.component.html',
  styleUrls: ['./citation-form.component.css']
})
export class CitationFormComponent implements OnInit {
  @Input() citation?: Citation; // citation model
  @Input() violations?: Violation[] // array of violation models
  @Input() citationWithViolations?: CitationWithViolations; // model combining citation and violation(s) info
  @Input() editingCitation: boolean = false;

  // array of all US states used for state drop-down menu
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

  citationFormGroup = this._formBuilder.group({
    type: ['', Validators.required],
    date: [this.currentDate],
    time: ['', Validators.required],
    owner_fault: [true],
    desc: [''],
    violation_loc: ['', Validators.required],
    vin: ['', Validators.required],
    vin_state: [''],
    violations: this._formBuilder.array([]),
  });

  constructor(private _formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
  }

  violationsArray(): FormArray {
    return this.citationFormGroup.get("violations") as FormArray;
  }

  // creates an empty violation
  newViolation(): FormGroup {
    return this._formBuilder.group({
      group: '',
      code: '',
      degree: '',
      desc: '',
    })
  }

  // adds a new violation to the form and citationViolations array
  addViolation() {
    this.violationsArray().push(this.newViolation());
    this.violations?.push(new Violation());
  }

  // removes a violation from the form and from the citationViolations array
  removeViolation(i: number) {
    this.violationsArray().removeAt(i);
    this.violations?.splice(i, 1);
  }

}
