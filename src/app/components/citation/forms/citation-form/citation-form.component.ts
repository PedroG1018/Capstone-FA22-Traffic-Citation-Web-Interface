import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
  }

  get citationInfo() {
    return this.form.get('citationInfo') as FormGroup;
  }

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

  // remove a violation from the form and violations array
  removeViolation(i: number) {
    this.violationsArray().removeAt(i);
    this.violations?.splice(i, 1);
  }

}
