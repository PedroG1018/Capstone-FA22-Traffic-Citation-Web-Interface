import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCitationComponent } from '../edit-citation/edit-citation.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, finalize, of, tap } from 'rxjs';
import { CitationsResponse } from 'src/app/DTO/citationsResponse';

@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css'],
})
export class ViewCitationsComponent implements AfterViewInit, OnInit {
  citations: Citation[] = [];
  citationToEdit?: Citation;
  citationCount?: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Used to determine order of table columns
  displayedColumns = [
    'type',
    'sign_date',
    'time',
    'violation_loc',
    'vin',
    'code_section',
    'officer_name',
    'officer_badge',
  ];

  constructor(private citationService: CitationService, private dialog: MatDialog) {
    this.paginator = new MatPaginator(new MatPaginatorIntl, ChangeDetectorRef.prototype)
  }

  ngOnInit(): void {
    this.loadCitations(1,5);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadCitationsPage())).subscribe();
  }

  ngOnDestroy() {
    this.loadingSubject.complete();
  }

  loadCitationsPage() {
    this.loadCitations(this.paginator.pageIndex, this.paginator.pageSize);
  }

  loadCitations(pageNumber = 1, pageSize = 5) {
    // Retrieve citations from database. Display progress spinner until data is loaded
    console.log(this.paginator);
    this.loadingSubject.next(true);
    this.citationService
      .getCitationsPaginator(pageNumber, pageSize)
      .pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
      .subscribe((result: CitationsResponse) => (
        console.log(result),
        this.citations = result.citations,
        this.citationCount = result.totalCitationsCount
        ));
  }

  
  openDialog(citation : Citation) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = citation;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(EditCitationComponent, dialogConfig).afterClosed().subscribe(result => {
      // If citation was deleted after closing dialog, update list
      if (result) {
        this.loadCitationsPage();
      }
    });
  }
}