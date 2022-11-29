import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { DriverLicenseDialogComponent } from '../driver-license-dialog/driver-license-dialog.component';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css'],
  providers: [],
})
export class DriverFormComponent extends Unsubscriber implements OnInit {
  @Input() driver: Driver;
  @Output() driverEmitted = new EventEmitter<Driver>();
  @Output() driverFormEmitted = new EventEmitter<FormGroup>();

  existingDriverFound: boolean;

  // Default age of driver is set to 18 years
  defaultDate = formatDate(
    new Date().setFullYear(new Date().getFullYear() - 18),
    'yyyy-MM-dd',
    'en-US'
  );

  driverForm = new FormGroup({
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
    license_class: new FormControl('C', [Validators.required]),
  });

  constructor(
    private driverService: DriverService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    super();
    this.existingDriverFound = false;
    this.driver = new Driver();
  }

  ngOnInit(): void {
    this.addNewSubscription = this.driverForm.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.emitDriverData();
      })
    });
  }

  autoFillForm(): void {
    this.driverForm.controls.name.setValue('Otter');
    this.driverForm.controls.date_birth.setValue(this.defaultDate);
    this.driverForm.controls.sex.setValue('F');
    this.driverForm.controls.hair.setValue('Black');
    this.driverForm.controls.eyes.setValue('Green');
    this.driverForm.controls.height.setValue('3\'00"');
    this.driverForm.controls.weight.setValue(90);
    this.driverForm.controls.race.setValue('N/A');
    this.driverForm.controls.address.setValue('100 ST.');
    this.driverForm.controls.city.setValue('Seaside');
    this.driverForm.controls.state.setValue('CA');
    this.driverForm.controls.zip.setValue(99999);
    this.driverForm.controls.license_no.setValue('D1234567');
    this.driverForm.controls.license_class.setValue('C');
  }

  emitDriverData(): void {
    this.updateDriverValues();
    this.driverEmitted.emit(this.driver);
  }

  // Use getter and setter because ngModel is deprecated with FormControlName as of Angular V6..
  updateDriverValues() {
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
    this.driver.license_class = this.driverForm.get('license_class')
      ?.value as string;
  }

  // If driver found set values of form
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
        license_class: this.driver.license_class,
      });
    }
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
          this.setDriverValues();
        } else {
          this.existingDriverFound = false;
        }
      });
    this.addNewSubscription = dialogRef;
  }
}
