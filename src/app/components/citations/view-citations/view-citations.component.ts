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
import { AuthService } from '@auth0/auth0-angular';
import { Violation } from 'src/app/models/violation';
import { CompleteCitation } from 'src/app/models/complete-citation';

@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css'],
})
export class ViewCitationsComponent extends Unsubscriber implements AfterViewInit, OnInit {
  citationToEdit?: Citation;
  citationCount?: number;
  userId?: string | undefined;
  userRole?: string | undefined;
  completeCitations: CompleteCitation[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private citationService: CitationService, private dialog: MatDialog, private auth: AuthService) {
    super();
    this.paginator = new MatPaginator(
      new MatPaginatorIntl(),
      ChangeDetectorRef.prototype
    );
  }

  ngOnInit(): void {
    // this.addNewSubscription = this.auth.user$.subscribe(user => {
    //   if (user) {
    //     this.userRole = user['dev-3k36-3cg.us.auth0.com/roles'][0];
    //     this.userId = user.sub;
    //     this.loadCitations(1, 5);
    //   }
    // });
    this.loadCitations(1, 8);
  }

  ngAfterViewInit() {
    if(this.paginator) {
      this.paginator.page.pipe(tap(() => this.loadCitationsPage())).subscribe();
    }
  }

  loadCitationsPage() {
    this.loadCitations(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  // Retrieve citations from database. Display progress spinner until data is loaded
  loadCitations(pageNumber: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.addNewSubscription = this.citationService
      .getCitationsPaginatorTEST(pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(response => {
        if (response) {
          this.completeCitations = response.completeCitationList,
          this.citationCount = response.totalCitationsCount
        }
      });

    // if(this.userId && this.userRole) {
    //
    // }
  }
  
  openDialog(citation: Citation, violations: Violation[], driver: Driver) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      citation: citation,
      violations: violations,
      driver: driver
    }
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;

    const dialogRef = this.dialog
      .open(EditCitationComponent, dialogConfig)
      .afterClosed()
      .subscribe((isDeleted) => {
        // If citation was deleted after closing dialog then refresh list
        if (isDeleted && this.citationCount) {
          this.loadCitationsPage();
          this.citationCount--;
        }
      });
    this.addNewSubscription = dialogRef;
  }
}
