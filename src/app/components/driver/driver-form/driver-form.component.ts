import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Input() editingCitation?: boolean;
  @Input() driverFound?: boolean;
  @Input() states: string[] = [];
  @Input() form!: FormGroup;

  // Use two way binding to emit change to parent component
  @Output() driverChange = new EventEmitter<Driver>();
  @Output() driverFoundChange = new EventEmitter<boolean>();

  constructor(private driverService: DriverService, private dialog: MatDialog) {
    super();
  }

  get driverInfo() {
    return this.form.get('driverInfo') as FormGroup;
  }

  submitForm() {
    // Check validity of form controls and mark as touched (changed)
    Object.keys(this.driverInfo.controls).forEach(control => {
      this.driverInfo.controls[control].markAsTouched();
      this.driverInfo.controls[control].updateValueAndValidity();
    });
  }

  // Update form values with found driver
  setDriverValues(driver: Driver) {
    this.driverInfo.patchValue({
      driver_name: driver.driver_name,
      date_birth: driver.date_birth,
      sex: driver.sex,
      hair: driver.hair,
      eyes: driver.eyes,
      height: driver.height,
      weight: driver.weight,
      race: driver.race,
      address: driver.address,
      city: driver.city,
      state: driver.state,
      zip: driver.zip,
      license_class: driver.license_class
    });
  }

  // If driver license number exists ask to autofill form
  findDriverByLicense(event: string) {
    if (!this.editingCitation && event?.length == 8 && !this.driverFound) {
      this.addNewSubscription = this.driverService.getDriverByLicenseNo(event).subscribe(result => {
        if (typeof result === 'object') {
          this.openDialog(result);
        }
      });
    } else {
      this.driverFound = false;
    }
  }

  // Dialog that checks with user if they want to autofill form
  openDialog(driver: Driver) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '335px';
    dialogConfig.height = 'auto';

    const dialogRef = this.dialog
      .open(DriverLicenseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(isAutofill => {
        if (isAutofill) {
          this.driver = driver;
          this.driverChange.emit(this.driver);
          this.setDriverValues(driver);
          this.driverFound = true;
          this.driverFoundChange.emit(this.driverFound);
        } else {
          this.driverFound = false;
          this.driverFoundChange.emit(this.driverFound);

          // Clear all fields
          Object.keys(this.driverInfo.controls).forEach(control => {
            this.driverInfo.controls[control].patchValue(null);
            this.driverInfo.controls[control].markAsPristine();
          });
        }
      });
    this.addNewSubscription = dialogRef;
  }
}