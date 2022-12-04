import { formatDate } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, User } from '@auth0/auth0-angular';
import { Citation } from 'src/app/models/citation';
import { CitationWithViolations } from 'src/app/models/citation-with-violations';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';
import { CitationService } from 'src/app/services/citation.service';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css'],
})

export class CreateCitationComponent extends Unsubscriber implements OnInit {
  driver = new Driver();
  citation = new Citation();
  violations: Violation[] = [];
  driverFound: boolean = false;

  citationForm!: FormGroup;
  citationCreated: boolean;
  user: User = new User;

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
  defaultDate = formatDate(new Date().setFullYear(new Date().getFullYear() - 18), 'yyyy-MM-dd', 'en-US');
  // Current date and time for citation
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  currentTime = new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2, '0');

  constructor(private citationService: CitationService, private driverService: DriverService, private snackBar: MatSnackBar, private fb: FormBuilder, private auth: AuthService) { 
    super();  
    this.citationCreated = false;
  }

  ngOnInit(): void {
    // Set current user
    this.addNewSubscription = this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.setCitationUser();
      }
    });
    

    this.initForm();
  }

  setCitationUser() {
    // Link the auth user sub property with citation to act as user id
    this.citation.user_id = this.user.sub;

    // Use auth0 user data for officer fields
    this.citation.officer_name = this.user.name!;
    this.citation.officer_badge =  this.user['https://example.com/badge_number'].toString();
    this.citation.sign_date = this.currentDate;
  }

  initForm() {
    // Citation form to be used
    this.citationForm = this.fb.group({
      'driverInfo': this.fb.group({
        driver_name: ['', [Validators.required]],
        date_birth: [this.defaultDate, [Validators.required]],
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
        date: [this.currentDate],
        time: [this.currentTime, Validators.required],
        owner_fault: [null, Validators.required],
        desc: ['', Validators.required],
        violation_loc: ['', Validators.required],
        vin: ['', Validators.required],
        vin_state: ['', Validators.required],
        code: ['', Validators.required],
        violations: this.fb.array([])
      }),
    });
  }

  onFormSubmit(): void {
    // Get values from form groups
    this.driver = Object.assign(this.driver, this.citationForm.get('driverInfo')?.value);
    this.citation = Object.assign(this.citation, this.citationForm.get('citationInfo')?.value);
    this.violations = Object.assign(this.violations, this.citationForm.get('citationInfo.violations')?.value);
    this.saveDriver();
  }

  saveDriver() {
    console.log('Driver Found Status: ' + this.driverFound);
    if (!this.driverFound) {
      // Create new driver
      this.addNewSubscription = this.driverService
        .createDriver(this.driver)
        .subscribe((result) => {
          if (result) {
            this.driver = result;
            this.saveCitationWithViolations();
          }
        });
    } else {
      // Update existing driver
      this.addNewSubscription = this.driverService
        .updateDriver(this.driver)
        .subscribe((result) => {
          if (result) {
            this.driver = result;
            this.saveCitationWithViolations();
          }
        });
    }
  }

  saveCitationWithViolations() {
    let citationWithViolations = new CitationWithViolations();
    this.citation.driver_id = this.driver.driver_id;
    citationWithViolations.citation = this.citation;
    citationWithViolations.violations = this.violations;
    console.log(citationWithViolations);

    this.addNewSubscription = this.citationService.createCitationWithViolations(citationWithViolations).subscribe(result => {
      if (result) {
        this.snackBar.open("Successfully Created Traffic Citation", '', { duration: 2800 });
        this.citation = result;
        this.citationCreated = true;
      }
    }); 
  }

  resetForm() {
    this.initForm();
    this.citationCreated = false; 
    this.driverFound = false;
    this.citation = new Citation();
    this.setCitationUser();
  }
}