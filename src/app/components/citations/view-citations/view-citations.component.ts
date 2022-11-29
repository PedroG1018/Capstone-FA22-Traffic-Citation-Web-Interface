import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { CitationService } from 'src/app/services/citation.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCitationComponent } from '../edit-citation/edit-citation.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, finalize, of, tap } from 'rxjs';
import { CitationsResponse } from 'src/app/DTO/citationsResponse';
import { Unsubscriber } from 'src/app/services/unsubscriber';

@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css'],
})
export class ViewCitationsComponent
  extends Unsubscriber
  implements AfterViewInit, OnInit
{
  // Citations displayed per page
  citations: Citation[] = [];
  // Drivers linked to displayed citations with matching driver_id
  drivers: Driver[] = [];
  // Driver linked to current citation of table row
  driverForRow?: Driver;
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
    'driver_name',
    'license_no',
    'officer_name',
    'officer_badge',
  ];

  constructor(
    private citationService: CitationService, private dialog: MatDialog) {
    super();
    this.paginator = new MatPaginator(
      new MatPaginatorIntl(),
      ChangeDetectorRef.prototype
    );
  }

  ngOnInit(): void {
    this.loadCitations(1, 5);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadCitationsPage())).subscribe();
  }

  loadCitationsPage() {
    this.loadCitations(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  // Retrieve citations from database. Display progress spinner until data is loaded
  loadCitations(pageNumber: number, pageSize: number) {
    this.loadingSubject.next(true);
    
    this.addNewSubscription = this.citationService
      .getCitationsPaginator(pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        (result: CitationsResponse) => (
          (this.citations = result.citations),
          (this.drivers = result.drivers),
          (this.citationCount = result.totalCitationsCount)
        )
      );
  }

  // Match the citation that's displayed in mat-table row to the driver by driver id
  findDriverOfCitation(citation: Citation) {
    const driver = this.drivers.find(
      (element) => element.driver_id == citation.driver_id
    );

    this.driverForRow = driver || new Driver();
  }

  openDialog(citation: Citation) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = citation;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;

    const dialogRef = this.dialog
      .open(EditCitationComponent, dialogConfig)
      .afterClosed()
      .subscribe((isDeleted) => {
        // If citation was deleted after closing dialog then refresh list
        if (isDeleted) {
          this.loadCitationsPage();
        }
      });
    this.addNewSubscription = dialogRef;
  }
}