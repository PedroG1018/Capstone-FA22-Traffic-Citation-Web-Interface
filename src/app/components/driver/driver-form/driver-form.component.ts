import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
export class DriverFormComponent extends Unsubscriber {
  @Input() driver?: Driver;
  @Input() editingForm?: boolean;

  existingDriverFound: boolean;

  // Default age of driver is set to 18 years
  defaultDate = formatDate(
    new Date().setFullYear(new Date().getFullYear() - 18),
    'yyyy-MM-dd',
    'en-US'
  );

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

  constructor(private driverService: DriverService, private dialog: MatDialog, private _formBuilder: FormBuilder) {
    super();
    this.existingDriverFound = false;
  }

  // If driver license number exists ask to autofill form
  findDriverByLicense(event: string) {
    if (!this.editingForm && event.length == 8) {
      this.addNewSubscription = this.driverService.getDriverByLicenseNo(event).subscribe(result => {
        if (typeof result === 'object') {
          this.openDialog(result);
        }
      });
    }  
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
