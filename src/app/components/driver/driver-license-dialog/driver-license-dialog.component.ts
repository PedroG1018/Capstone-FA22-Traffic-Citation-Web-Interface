import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InputErrorStateMatcher } from 'src/app/error-state-matching';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { CreateDriverComponent } from '../create-driver/create-driver.component';

@Component({
  selector: 'app-driver-license-dialog',
  templateUrl: './driver-license-dialog.component.html',
  styleUrls: ['./driver-license-dialog.component.css'],
})
export class DriverLicenseDialogComponent extends Unsubscriber implements OnInit {
  matcher = new InputErrorStateMatcher();

  licenseForm = new FormGroup({
    // California License numbers start with 1 Alpha + 7 numeric, TODO: Finish regex pattern
    license_no: new FormControl('', [Validators.pattern('^[A-Z]+[0-9]*$'), Validators.maxLength(8), Validators.minLength(8)]),
  })

  constructor(
    private driverService: DriverService,
    private dialogRef: MatDialogRef<CreateDriverComponent>
  ) {
    super();
  }

  ngOnInit(): void {}

  // On form submit get driver by their license number
  // If no driver exists create a new one
  onFormSubmit() {
    this.getDriverByLicense();
  }

  // Get license number value from form
  get licenseNumber(): any {
    return this.licenseForm.get('license_no')?.value;
  }

  getDriverByLicense() {
    this.addNewSubscription = this.driverService.getDriverByLicenseNo(this.licenseNumber).subscribe(result => {
      if (result != undefined) {
        this.dialogRef.close(result);
      } else {
        this.dialogRef.close(this.licenseNumber);
      }
    });
  }
}
