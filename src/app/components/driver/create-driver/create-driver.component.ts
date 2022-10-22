import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputErrorStateMatcher } from 'src/app/error-state-matching';
import { Driver } from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent implements OnInit {
  @Input() driver?: Driver;
  @Output() driverCreated = new EventEmitter<Driver>();

  matcher = new InputErrorStateMatcher(); // For form validation

  driverForm = new FormGroup({
    name: new FormControl('' [Validators.required, Validators.name]),
    // TODO: Make sure driver is at least 15 years old. Can't be 1 year old.
    date_birth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US')),
    sex: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    hair: new FormControl('', [Validators.required]),
    eyes: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    race: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('',[Validators.required]),
    zip: new FormControl('',[Validators.required, Validators.pattern('[0-9]')]),
    license_no: new FormControl('', [Validators.required]),
    license_class: new FormControl('', [Validators.required]),
  })

  constructor(private driverService: DriverService) {

  }

  ngOnInit(): void {
  }

  onFormSubmit(): void {

  }

  createDriver(driver: Driver) {
    this.driver = driver;
    // this.driverService.createDriver(driver).subscribe((driver) => this.driverCreated.emit(driver));
  }

}
