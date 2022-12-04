import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Citation } from 'src/app/models/citation';
import { CitationWithViolations } from 'src/app/models/citation-with-violations';
import { Violation } from 'src/app/models/violation';

@Component({
  selector: 'app-citation-form',
  templateUrl: './citation-form.component.html',
  styleUrls: ['./citation-form.component.css']
})
export class CitationFormComponent {
  // For use when editing citation in view citations
  @Input() violations?: Violation[]
  @Input() states: string[] = [];
  @Input() editingCitation: boolean = false;
  @Input() form!: FormGroup;

  codes = [
    {
      'code': 'CUT1105',
      'desc': 'CUT1105-I-Sleeping in Vehicle',
      'degree': 'I',
      'group': 'VC1463 Vehicle Code (Infraction) Violations'
    },
    {
      'code': 'PC664-VC2800.2a-F',
      'desc': 'PC664-VC2800.2(a)-F-Attempt to Evade Police w/ Disregard for Safety',
      'degree': 'F',
      'group': 'VC1463 Vehicle Code (Infraction) Violations'
    },
  ];

  constructor(private fb: FormBuilder) {
  }

  get citationInfo() {
    return this.form.get('citationInfo') as FormGroup;
  }

  // can maybe remove this...
  submitForm() {
    // Check validity of form controls and mark as touched (changed)
    Object.keys(this.citationInfo.controls).forEach(control => {
      this.citationInfo.controls[control].markAsTouched();
      this.citationInfo.controls[control].updateValueAndValidity();
    });
  }

  // form array violations getter
  violationsArray(): FormArray {
    return this.form.get("citationInfo.violations") as FormArray;
  }

  // creates an empty violation form group
  newViolation(): FormGroup {
    return this.fb.group({
      group: '',
      code: '',
      degree: '',
      desc: '',
    })
  }

  // adds a new violation to the form and violations array
  addViolation() {
    this.violationsArray().push(this.newViolation());
    this.violations?.push(new Violation());
  }

  // removes a violation from the form and from the violations array
  removeViolation(i: number) {
    this.violationsArray().removeAt(i);
    this.violations?.splice(i, 1);
  }

}
