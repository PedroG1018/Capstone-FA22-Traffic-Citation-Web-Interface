import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  matcher = new InputErrorStateMatcher(); // For form validation

  driverForm = new FormGroup({
    name: new FormControl('' [Validators.required, Validators.name]),
    // TODO: Make sure driver is at least 15 years old. Can't be 1 year old.
    date_birth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US')),
    sex: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    hair: new FormControl('', [Validators.required]),
    eyes: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    race: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('',[Validators.required]),
    zip: new FormControl('',[Validators.required, Validators.pattern('[0-9]')]),
    license_no: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]),
    license_class: new FormControl('', [Validators.required]),
  })

  constructor(private driverService: DriverService, private dialog: MatDialog, private router: Router) {
    super()
    this.createDriverNow = false;
    this.driver = new Driver();
  }

  ngOnInit(): void {
    this.openDialog();
  }

  onFormSubmit(): void {
    this.router.navigate(['/create-citation'])
  }

  createDriver() {
    // this.driverService.createDriver(this.driver).subscribe((driver) => this.driverCreated.emit(this.driver));
    
  }

  // If license number exists retrieves driver information and auto fills form
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DriverLicenseDialogComponent, dialogConfig).afterClosed().subscribe(result => {
      // If driver already exists make that current driver
      if (result != "Not Found") {
        this.driver = result;
        console.log("RESULT: " + result);
      }
      // Can now fill the form even if driver doesn't exist
      this.createDriverNow = true;
    });
    this.addNewSubscription = dialogRef;
  }

}
