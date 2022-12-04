import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverFormComponent } from '../../citation/forms/driver-form/driver-form.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<DriverFormComponent>) { }

  public title: string = '';

  onConfirm() {
    this.dialogRef.close(true);
  }

  onDismiss() {
    this.dialogRef.close(false);
  }
}
