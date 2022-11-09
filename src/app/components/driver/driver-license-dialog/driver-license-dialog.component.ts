import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { InputErrorStateMatcher } from 'src/app/error-state-matching';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { CreateDriverComponent } from '../create-driver/create-driver.component';

@Component({
  selector: 'app-driver-license-dialog',
  templateUrl: './driver-license-dialog.component.html',
  styleUrls: ['./driver-license-dialog.component.css'],
})
export class DriverLicenseDialogComponent {
  constructor(private dialogRef: MatDialogRef<CreateDriverComponent>) { }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onDismiss() {
    this.dialogRef.close(false);
  }
}
