import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ViewCitationsComponent } from '../view-citations/view-citations.component';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Violation } from 'src/app/models/violation';
import { Driver } from 'src/app/models/driver';
import { ViolationService } from 'src/app/services/violation.service';
import { DriverService } from 'src/app/services/driver.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormatTimeSpan } from '../view-citations/formatTimespan';

@Component({
  selector: 'app-edit-citation',
  templateUrl: './edit-citation.component.html',
  styleUrls: ['./edit-citation.component.css']
})
export class EditCitationComponent extends Unsubscriber implements OnInit {
  @Input() citation: Citation;
  @Input() violations: Violation[];
  @Input() driver: Driver;

  @Output() citationUpdated = new EventEmitter<Citation>();
  @Output() violationsUpdated = new EventEmitter<Violation[]>();
  @Output() driverUpdated = new EventEmitter<Driver>();

  deletedCitation: boolean = false;
  updatedCitation: boolean = false;
  updatedDriver: boolean = false;

  // Form for editing citation
  citationForm!: FormGroup;

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

  constructor(
    private citationService: CitationService,
    private violationService: ViolationService,
    private driverService: DriverService,
    private dialogRef: MatDialogRef<ViewCitationsComponent>, @Inject(MAT_DIALOG_DATA) data,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    super()
    this.citation = data.citation;
    this.citation.time = data.citation.time.slice(0,5);
    this.violations = data.violations;
    this.driver = data.driver;
  }
  ngOnInit(): void {
    this.addNewSubscription = this.driverUpdated.subscribe(() => {
      this.updatedDriver = true;
    });

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

    this.setFormValue();
  }

  setFormValue() {
    this.citationForm.get('driverInfo')?.patchValue(this.driver);
    this.citationForm.get('citationInfo')?.patchValue(this.citation);
    this.citationForm.get('officerInfo')?.patchValue(this.citation)
    this.citationForm.get('citationInfo.violations')?.patchValue(this.violations);
  }

  getFormValues() {
    this.driver = Object.assign(this.driver!, this.citationForm.get('driverInfo')?.value);
    this.citation = Object.assign(this.citation!, this.citationForm.get('citationInfo')?.value);
    this.citation = Object.assign(this.citation!, this.citationForm.get('officerInfo')?.value);
    this.violations = Object.assign(this.violations!, this.citationForm.get('citationInfo.violations')?.value);
  }

  updateCitation(citation: Citation, violations: Violation[], driver: Driver) {
    this.getFormValues();

    this.addNewSubscription = this.citationService.updateCitation(citation).subscribe((citation: Citation | undefined) => {
      this.citationUpdated.emit(citation);

      this.addNewSubscription = this.driverService.updateDriver(driver).subscribe((driver: Driver | undefined) => {
        this.driverUpdated.emit(driver);
      });
      
      this.addNewSubscription = this.violationService.updateViolations(violations).subscribe((violations: Violation[] | undefined) => {
        this.violationsUpdated.emit(violations);
      });
      this.updatedCitation = true;
      this.closeDialog();
    });
  }

  deleteCitation(citation: Citation) {
    this.addNewSubscription = this.citationService.deleteCitation(citation).subscribe((citation: Citation | undefined) => {
      this.citationUpdated.emit(citation);
      this.deletedCitation = true;
      this.deleteViolations(this.violations);
    });
  }

  deleteViolations(violations: Violation[]) {
    let ids: number[] = [];

    violations.forEach(violation => {
      ids.push(violation.violation_id!);
    });

    this.violationService.deleteViolations(ids)
    this.closeDialog();
  }

  closeDialog() {
    if (this.deletedCitation) {
      this._snackBar.open("Traffic Citation Deleted", '', { duration: 1500 });
      this.dialogRef.close("delete");
    } else if (this.updatedCitation) {
      this._snackBar.open("Traffic Citation Updated", '', { duration: 1500 });
      this.dialogRef.close("updatedDriver");
    }
    else {
      this.dialogRef.close();
    }

  }
}