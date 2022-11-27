import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-view-citation-summary',
  templateUrl: './view-citation-summary.component.html',
  styleUrls: ['./view-citation-summary.component.css'],
})
export class ViewCitationSummaryComponent
  extends Unsubscriber
  implements OnInit
{
  @Input() driver?: Driver;
  @Input() citation?: Citation;
  @Input() violations?: Violation[];
  @Input() editingCitation: boolean = false;

  // Form for editing citation
  citationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    // Citation form to be used
    this.citationForm = this.fb.group({
      'driverInfo': this.fb.group({
        driver_name: ['', [Validators.required]],
        date_birth: ['', [Validators.required]],
        sex: ['', [Validators.required]],
        hair: ['', [Validators.required]],
        eyes: ['', [Validators.required]],
        height: ['', [Validators.required]],
        weight: [null, [ Validators.required, Validators.pattern('^[0-9]*$')]],
        race: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
        license_no: ['', [Validators.required, Validators.pattern('^[A-Z]+[0-9]*$'), Validators.maxLength(8), Validators.minLength(8)]],
        license_class: ['', [Validators.required]]
      }),
      'citationInfo': this.fb.group({
        type: ['', Validators.required],
        date: [''],
        time: ['', Validators.required],
        owner_fault: [null, Validators.required],
        desc: ['', Validators.required],
        violation_loc: ['', Validators.required],
        vin: ['', Validators.required],
        vin_state: ['', Validators.required],
        violations: this.fb.array([])
      }),
      'officerInfo': this.fb.group({
        officer_name: ['', Validators.required],
        officer_badge: ['', Validators.required],
        sign_date: ['']
      })
    });
  }
}