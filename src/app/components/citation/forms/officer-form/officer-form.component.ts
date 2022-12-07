import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-officer-form',
  templateUrl: './officer-form.component.html',
  styleUrls: ['./officer-form.component.css']
})
export class OfficerFormComponent implements OnInit {
  @Input() form!: FormGroup;

  constructor(public auth: AuthService,) { }

  ngOnInit(): void {
  }

  get officerInfo() {
    return this.form.get('officerInfo') as FormGroup;
  }
}
