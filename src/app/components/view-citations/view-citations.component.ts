import { Component, OnInit } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCitationComponent } from '../edit-citation/edit-citation.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, finalize, of } from 'rxjs';


@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css'],
})
export class ViewCitationsComponent implements OnInit {
  citations: Citation[] = [];
  citationsToShow: Citation[] = [];
  citationToEdit?: Citation;
  citationCount?: number;
  pageSize = 10;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  
  pageEvent: PageEvent = new PageEvent;


  // Used to determine order of material table columns
  displayedColumns = [
    'type',
    'sign_date',
    //'date',
    'time',
    //'owner_fault',
    //'desc',
    'violation_loc',
    'vin',
    'vin_state',
    'code_section',
    'officer_name',
    'officer_badge',
  ];

  constructor(private citationService: CitationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadingSubject.next(true);
    this.citationService
      .getCitations()
      .pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
      .subscribe((result: Citation[]) => (
        this.citations = result, 
        this.citationCount = result.length, 
        this.citationsToShow = result.slice(0, this.pageSize)));

  }

  ngOnDestroy() {
    this.loadingSubject.complete();
  }

  editCitation(citation: Citation) {
    this.citationToEdit = citation;
  }

  updateCitationList(citations: Citation[]) {
    this.citations = citations;
  }

  openDialog(citation : Citation) {
    // Open a dialog showing citation and options to edit/delete
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = citation;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    this.dialog.open(EditCitationComponent, dialogConfig);
  }

  // Determine which page and what range of array you're looking at
  onPageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = (event.pageIndex + 1) * event.pageSize;
    const sliceCitations = this.citations.slice(startIndex, endIndex);
    this.citationsToShow = sliceCitations;
    
    return this.pageEvent;
  }
}