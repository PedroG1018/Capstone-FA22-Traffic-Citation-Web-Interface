import { formatDate } from '@angular/common';
import { Component, OnInit, EventEmitter, Input, Output, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Citation } from 'src/app/models/citation';
import { CitationWithViolations } from 'src/app/models/citation-with-violations';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';
import { CitationService } from 'src/app/services/citation.service';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { DriverLicenseDialogComponent } from '../../driver/driver-license-dialog/driver-license-dialog.component';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css'],
})

export class CreateCitationComponent extends Unsubscriber implements OnInit {
  @Input() driver: Driver;
  @Input() citation?: Citation; // citation model
  @Input() citationViolations?: Violation[] // array of violation models
  @Input() citationWithViolations?: CitationWithViolations; // model combining citation and violation(s) info
  @Output() citationsCreated = new EventEmitter<Citation[]>();
  @Output() citationsWithViolationsCreated = new EventEmitter<CitationWithViolations[]>();

  existingDriverFound: boolean;
  citationCreated: boolean;

  citations?: Citation[] = [];
  citationsWithViolations?: CitationWithViolations[] = [];
  
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString()); 

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

  // Default age of driver is set to 18 years
  defaultDate = formatDate(
    new Date().setFullYear(new Date().getFullYear() - 18),
    'yyyy-MM-dd',
    'en-US'
  );

  // FormsGroups to use for stepper
  driverFormGroup = this._formBuilder.group({
    name: new FormControl(''[(Validators.required, Validators.name)]),
    date_birth: new FormControl(this.defaultDate),
    sex: new FormControl('F', [Validators.required]),
    hair: new FormControl('', [Validators.required]),
    eyes: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl(<number | undefined>0, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    race: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl(<number | undefined>0, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    license_no: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Z]+[0-9]*$'),
      Validators.maxLength(8),
      Validators.minLength(8),
    ]),
    license_class: new FormControl('C', [Validators.required])
  });

  currentDate = formatDate(new Date(), 'yyyy-MM-dd','en-US');

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

  officerFormGroup = this._formBuilder.group({
    officer_name: [''],
    officer_badge: [''],
    sign_date: ['']
  });

  constructor(private citationService: CitationService, private driverService: DriverService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, private dialog: MatDialog) {
    super()
    this.existingDriverFound = false;
    this.citationCreated = false;
    this.driver = new Driver();

    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.citation = new Citation();
    this.citationViolations = [];
    this.citationWithViolations = new CitationWithViolations();
  }

  onFormSubmit(): void {
    this.saveDriver();
    this.saveCitationWithViolations();
  }

  saveDriver() {
    if (!this.existingDriverFound) {
      this.addNewSubscription = this.driverService
        .createDriver(this.driver)
        .subscribe((result) => {
          if (result) {
            this.driver = result;
            sessionStorage.setItem('driver', JSON.stringify(result));
          }
        });
    } else {
      this.addNewSubscription = this.driverService
        .updateDriver(this.driver)
        .subscribe((result) => {
          if (result) {
            this.driver = result;
            sessionStorage.setItem('driver', JSON.stringify(result));
          }
        });
    }
  }

  saveCitationWithViolations() {
    if (this.citationWithViolations && this.citation) {
      this.citation.driver_id = this.driver.driver_id;
      this.citationWithViolations.citation = this.citation;
      this.citationWithViolations.violations = this.citationViolations;

      this.addNewSubscription = this.citationService.createCitationWithViolations(this.citationWithViolations).subscribe(result => {
        this._snackBar.open("Successfully Created Traffic Citation", '', { duration: 2800 });
        console.log(result);
        
        if (result) {
          this.citation = result;
          sessionStorage.setItem('citation', JSON.stringify(result));
          sessionStorage.setItem('violations', JSON.stringify(this.citationViolations));
  
          this.citationCreated = true;
        }
      });
    }
  }

  violations() : FormArray {
    return this.citationFormGroup.get("violations") as FormArray;
  }

  // creates an empty violation
  newViolation() : FormGroup {
    return this._formBuilder.group({
      group:'',
      code:'',
      degree:'',
      desc: '',
    })
  }

  // adds a new violation to the form and citationViolations array
  addViolation() {
    this.violations().push(this.newViolation());
    this.citationViolations?.push(new Violation());
  }

  // removes a violation from the form and from the citationViolations array
  removeViolation(i: number) {
    this.violations().removeAt(i);
    this.citationViolations?.splice(i, 1);
  }

  autoFillForm(): void {
    this.driver.driver_name = 'Otter';
    this.driver.date_birth = this.defaultDate;
    this.driver.sex = 'F';
    this.driver.hair = 'Black';
    this.driver.eyes = 'Green';
    this.driver.height = '3\'00"';
    this.driver.weight = 90;
    this.driver.race = 'N/A';
    this.driver.address = '100 ST.';
    this.driver.city = 'Seaside';
    this.driver.state = 'CA';
    this.driver.zip = 99999;
    this.driver.license_no = 'D1234567';
    this.driver.license_class = 'C';
  }

  // If driver license number exists ask to autofill form
  findDriverByLicense(event: string) {
    this.addNewSubscription = this.driverService.getDriverByLicenseNo(event).subscribe(result => {
      if (typeof result === 'object') {
        this.openDialog(result);
      }
    });
  }

  openDialog(driver: Driver) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '335px';
    dialogConfig.height = 'auto';

    const dialogRef = this.dialog
      .open(DriverLicenseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (result && !this.existingDriverFound) {
          this.driver = driver;
          this.existingDriverFound = true;
        } else {
          this.existingDriverFound = false;
        }
      });
    this.addNewSubscription = dialogRef;
  }
}
