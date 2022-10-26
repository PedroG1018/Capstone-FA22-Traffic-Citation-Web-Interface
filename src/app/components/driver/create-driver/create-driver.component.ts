import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InputErrorStateMatcher } from 'src/app/error-state-matching';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { DriverLicenseDialogComponent } from '../driver-license-dialog/driver-license-dialog.component';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent extends Unsubscriber implements OnInit {
  @Input() driver: Driver;
  @Output() driverCreated = new EventEmitter<Driver>();

  createDriverNow: boolean;
  existingDriverFound: boolean;

  matcher = new InputErrorStateMatcher(); // For form validation

  driverForm = new FormGroup({
    name: new FormControl('' [Validators.required, Validators.name]),
    date_birth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US')),
    sex: new FormControl('', [Validators.required]),
    hair: new FormControl('', [Validators.required]),
    eyes: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl(<number|undefined>(0), [Validators.required, Validators.pattern('^[0-9]*$')]),
    race: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('',[Validators.required]),
    zip: new FormControl(<number|undefined>(0), [Validators.required, Validators.pattern('^[0-9]*$')]),
    license_no: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]+[0-9]*$'), Validators.maxLength(8), Validators.minLength(8)]),
    license_class: new FormControl('', [Validators.required]),
  })

  constructor(private driverService: DriverService, private dialog: MatDialog, private router: Router) {
    super()
    this.createDriverNow = false;
    this.existingDriverFound = false;
    this.driver = new Driver();
  }

  ngOnInit(): void {
    this.openDialog();
  }

  onFormSubmit(): void {
    this.createDriver();
  }

  // Use getter and setter because ngModel is deprecated with FormControlName as of Angular V6..
  updateDriverValues(){
    this.driver.driver_name = this.driverForm.get('name')?.value;
    this.driver.date_birth = this.driverForm.get('date_birth')?.value as string;
    this.driver.sex = this.driverForm.get('sex')?.value as string;
    this.driver.hair = this.driverForm.get('hair')?.value as string;
    this.driver.eyes = this.driverForm.get('eyes')?.value as string;
    this.driver.height = this.driverForm.get('height')?.value as string;
    this.driver.weight = this.driverForm.get('weight')?.value as number;
    this.driver.race = this.driverForm.get('race')?.value as string;
    this.driver.address = this.driverForm.get('address')?.value as string;
    this.driver.city = this.driverForm.get('city')?.value as string;
    this.driver.state = this.driverForm.get('state')?.value as string;
    this.driver.zip = this.driverForm.get('zip')?.value as number;
    this.driver.license_no = this.driverForm.get('license_no')?.value as string;
    this.driver.license_class = this.driverForm.get('license_class')?.value as string;
  }

  setDriverValues() {
    if (this.driver) {
      this.driverForm.setValue({
        name: this.driver.driver_name,
        date_birth: this.driver.date_birth,
        sex: this.driver.sex,
        hair: this.driver.hair,
        eyes: this.driver.eyes,
        height: this.driver.height,
        weight: this.driver.weight,
        race: this.driver.race,
        address: this.driver.address,
        city: this.driver.city,
        state: this.driver.state,
        zip: this.driver.zip,
        license_no: this.driver.license_no,
        license_class: this.driver.license_class
      });
    }
  }

  createDriver() {

    if (!this.existingDriverFound) {
      this.updateDriverValues();
      this.addNewSubscription = this.driverService.createDriver(this.driver).subscribe((result => {
        // Pass driverID to create citation route
        this.router.navigate(['/create-citation', result?.driver_id]);
      }));
    } else {
      this.updateDriverValues();
      this.addNewSubscription = this.driverService.updateDriver(this.driver).subscribe((result => {
        this.router.navigate(['/create-citation', result?.driver_id]);
      }));
    }
    
  }

  // If license number exists retrieves driver information and auto fills form
  // If no driver is found fills license number only
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog
    .open(DriverLicenseDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(result => {
      if (typeof(result) === 'string') {
        this.driverForm.patchValue({weight: null, zip: null, license_no: result})
        this.existingDriverFound = false;
      } else if (typeof(result) === 'object') {
        this.driver = result;
        this.setDriverValues();
        this.existingDriverFound = true;
      }
      this.createDriverNow = true; // Can now fill form
    });
    this.addNewSubscription = dialogRef;
  }

}
