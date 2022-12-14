import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { CitationService } from 'src/app/services/citation.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditCitationComponent } from '../edit-citation/edit-citation.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, finalize, of, tap } from 'rxjs';
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
  citationsFound: boolean = true;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private citationService: CitationService, private dialog: MatDialog, private auth: AuthService) {
    super();
    this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  }

  ngOnInit(): void {
    this.addNewSubscription = this.auth.user$.subscribe(user => {
      if (user) {
        this.userRole = user['dev-3k36-3cg.us.auth0.com/roles'][0];
        this.userId = user.sub;
        this.loadCitations(1, 8);
      }
    });
  }

  get isDark() {
    return localStorage.getItem('darkMode') == 'darkModeOn' ? true : false;
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.pipe(tap(() => this.loadCitationsPage())).subscribe();
    }
  }

  loadCitationsPage() {
    this.loadCitations(this.paginator.pageIndex + 1, this.paginator.pageSize);
  }

  // Retrieve citations from database. Display progress spinner until data is loaded
  loadCitations(pageNumber: number, pageSize: number) {
    this.loadingSubject.next(true);

    if (this.userId && this.userRole) {
      this.addNewSubscription = this.citationService
      .getCitationsPaginator(pageNumber, pageSize, this.userId, this.userRole)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(response => {
        if (response && response.totalCitationsCount > 0) {
          this.completeCitations = response.completeCitationList,
          this.citationCount = response.totalCitationsCount
          this.citationsFound = true;
        } else {
          this.citationsFound = false;
        }
      });
    }

    if (!this.userRole) {
      this.loadingSubject.next(false)
    }
  }
  
  openEditDialog(citation: Citation, violations: Violation[], driver: Driver) {
    const dialogRef = this.dialog.open(EditCitationComponent, {
      autoFocus: true,
      disableClose: true,
      width: '1000px',
      height: 'auto',
      data: {
        citation: citation,
        violations: violations,
        driver: driver
      }
    });

    this.addNewSubscription = dialogRef.afterClosed().subscribe((result) => {
      // If citation was deleted after closing dialog then refresh list
      if (result == 'delete' && this.citationCount) {
        // TODO: Hide element instead of reloading all citations
        this.loadCitationsPage();
        this.citationCount--;
      } else if (result == 'updatedDriver') {
        this.loadCitationsPage();
      }
    });
  }
}