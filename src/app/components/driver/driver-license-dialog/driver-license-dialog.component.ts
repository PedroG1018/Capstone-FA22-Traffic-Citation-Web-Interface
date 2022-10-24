import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { CreateDriverComponent } from '../create-driver/create-driver.component';

@Component({
  selector: 'app-driver-license-dialog',
  templateUrl: './driver-license-dialog.component.html',
  styleUrls: ['./driver-license-dialog.component.css'],
})
export class DriverLicenseDialogComponent extends Unsubscriber implements OnInit {
  @Input() license_no?: string;

  constructor(
    private driverService: DriverService,
    private dialogRef: MatDialogRef<CreateDriverComponent>
  ) {
    super();
  }

  ngOnInit(): void {}

  getDriverByLicense(license_no: string) {
    this.addNewSubscription = this.driverService.getDriverByLicenseNo(license_no).subscribe((result) => {
      if (result != 'Not Found') {
        console.log('DRIVER RETRIEVED: ' + result);
        this.dialogRef.close(result);
      } else {
        this.dialogRef.close();
      }
    });
  }
}
