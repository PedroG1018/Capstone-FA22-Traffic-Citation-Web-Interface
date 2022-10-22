import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  driverForm:  FormGroup;

  constructor(private driverService: DriverService, private fb: FormBuilder) {
    this.driverForm = this.fb.group({
      name:'',
    })
   }

  ngOnInit(): void {
  }

  createDriver(driver: Driver) {
    this.driver = driver;
    // this.driverService.createDriver(driver).subscribe((driver) => this.driverCreated.emit(driver));
  }

}
