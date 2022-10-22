import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ViewCitationsComponent } from '../view-citations/view-citations.component';

@Component({
  selector: 'app-edit-citation',
  templateUrl: './edit-citation.component.html',
  styleUrls: ['./edit-citation.component.css']
})
export class EditCitationComponent implements OnInit {
  @Input() citation?: Citation;
  @Output() citationsUpdated = new EventEmitter<Citation[]>();

  // Used injection token to access data stored in dialog
  constructor(
    private citationService: CitationService, 
    private dialogRef: MatDialogRef<ViewCitationsComponent>, @Inject(MAT_DIALOG_DATA) data,
    ) {
    
    this.citation = data;
  }

  ngOnInit(): void {
  }
   
  // Call citation.service methods to perform CRUD operations here
  updateCitation(citation: Citation) {
    this.citationService.updateCitation(citation).subscribe((citations: Citation[]) => this.citationsUpdated.emit(citations));
    this.closeDialog();
  }

  deleteCitation(citation:Citation) {
    this.citationService.deleteCitation(citation).subscribe((citations: Citation[]) => this.citationsUpdated.emit(citations));
    let deleted = true;
    this.dialogRef.close(deleted)
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
