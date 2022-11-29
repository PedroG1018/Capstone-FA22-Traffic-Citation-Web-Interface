import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ViewCitationsComponent } from '../view-citations/view-citations.component';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-citation',
  templateUrl: './edit-citation.component.html',
  styleUrls: ['./edit-citation.component.css']
})
export class EditCitationComponent extends Unsubscriber {
  @Input() citation?: Citation;
  @Output() citationUpdated = new EventEmitter<Citation>();

  constructor(
    private citationService: CitationService,
    private dialogRef: MatDialogRef<ViewCitationsComponent>, @Inject(MAT_DIALOG_DATA) data,
    private _snackBar: MatSnackBar,
  ) {
    super()
    this.citation = data;
  }

  updateCitation(citation: Citation) {
    this.addNewSubscription = this.citationService.updateCitation(citation).subscribe((citation: Citation | undefined) => {
      this._snackBar.open("Traffic Citation Updated", '', { duration: 1500 });
      this.citationUpdated.emit(citation);
      this.closeDialog();
    });
  }

  deleteCitation(citation: Citation) {
    this.addNewSubscription = this.citationService.deleteCitation(citation).subscribe((citation: Citation | undefined) => {
      this.citationUpdated.emit(citation);
      this._snackBar.open("Traffic Citation Deleted", '', { duration: 1500 });
      let deleted = true;
      this.dialogRef.close(deleted)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
