import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-officer-form',
  templateUrl: './officer-form.component.html',
  styleUrls: ['./officer-form.component.css']
})
export class OfficerFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() editingCitation: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get officerInfo() {
    return this.form.get('officerInfo') as FormGroup;
  }

  submitForm() {
    // Check validity of form controls and mark as touched (changed)
    Object.keys(this.officerInfo.controls).forEach(control => {
      this.officerInfo.controls[control].markAsTouched();
      this.officerInfo.controls[control].updateValueAndValidity();
    });
  }

}
