import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-officer-form',
  templateUrl: './officer-form.component.html',
  styleUrls: ['./officer-form.component.css']
})
export class OfficerFormComponent implements OnInit {
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  get officerInfo() {
    return this.form.get('officerInfo') as FormGroup;
  }
}
