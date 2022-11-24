import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ViewCitationsComponent } from '../view-citations/view-citations.component';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Violation } from 'src/app/models/violation';
import { Driver } from 'src/app/models/driver';
import { ViolationService } from 'src/app/services/violation.service';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-edit-citation',
  templateUrl: './edit-citation.component.html',
  styleUrls: ['./edit-citation.component.css']
})
export class EditCitationComponent extends Unsubscriber {
  @Input() citation: Citation;
  @Input() violations: Violation[];
  @Input() driver: Driver;

  @Output() citationUpdated = new EventEmitter<Citation>();
  @Output() violationsUpdated = new EventEmitter<Violation[]>();
  @Output() driverUpdated = new EventEmitter<Driver>();

  deletedCitation: boolean = false;
  updatedCitation: boolean = false;

  constructor(
    private citationService: CitationService,
    private violationService: ViolationService,
    private driverService: DriverService,
    private dialogRef: MatDialogRef<ViewCitationsComponent>, @Inject(MAT_DIALOG_DATA) data,
    private _snackBar: MatSnackBar,
  ) {
    super()
    this.citation = data.citation;
    this.violations = data.violations;
    this.driver = data.driver;
  }

  updateCitation(citation: Citation, violations: Violation[], driver: Driver) {
    this.addNewSubscription = this.citationService.updateCitation(citation).subscribe((citation: Citation | undefined) => {
      this.citationUpdated.emit(citation);

      this.addNewSubscription = this.driverService.updateDriver(driver).subscribe((driver: Driver | undefined) => {
        this.driverUpdated.emit(driver);
      });
      
      this.addNewSubscription = this.violationService.updateViolations(violations).subscribe((violations: Violation[] | undefined) => {
        this.violationsUpdated.emit(violations);
      });
      this.updatedCitation = true;
      this.closeDialog();
    });
  }

  deleteCitation(citation: Citation) {
    this.addNewSubscription = this.citationService.deleteCitation(citation).subscribe((citation: Citation | undefined) => {
      this.citationUpdated.emit(citation);
      this.deletedCitation = true;
      this.deleteViolations(this.violations);
    });
  }

  deleteViolations(violations: Violation[]) {
    let ids: number[] = [];

    violations.forEach(violation => {
      ids.push(violation.violation_id!);
    });

    this.violationService.deleteViolations(ids)
  }

  closeDialog() {
    if(this.deletedCitation) {
      // TODO: Delete Violations associated with citation too!
      this._snackBar.open("Traffic Citation Deleted", '', { duration: 1500 });
      this.dialogRef.close(this.deletedCitation);
    } else if (this.updatedCitation) {
      this._snackBar.open("Traffic Citation Updated", '', { duration: 1500 });
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
    }

  }
}
