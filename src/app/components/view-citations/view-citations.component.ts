import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { CitationDataSource } from 'src/app/data/CitationDataSource';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { tap } from 'rxjs/internal/operators/tap';
import { EditCitationComponent } from '../edit-citation/edit-citation.component';


@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css'],
})
export class ViewCitationsComponent implements OnInit {
  citations: Citation[] = [];
  citationsToShow: Citation[] = [];
  citationToEdit?: Citation;
  dataSource!: CitationDataSource;
  citationCount?: number;

  
  pageEvent: PageEvent = new PageEvent;


  // Used to determine order of material table columns
  displayedColumns = [
    'type',
    'date',
    'time',
    'owner_fault',
    'desc',
    'violation_loc',
    'sign_date',
    'vin',
    'vin_state',
    'code_section',
    'officer_name',
    'officer_badge',
  ];

  constructor(private citationService: CitationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.citationService
      .getCitations()
      .subscribe((result: Citation[]) => (this.citations = result, this.citationCount = result.length, this.citationsToShow = result));
      //TODO Dont get citations twice
    
    this.dataSource = new CitationDataSource(this.citationService);
    this.dataSource.loadCitations();
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

  onPageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = (event.pageIndex + 1) * event.pageSize;
    const sliceCitations = this.citations.slice(startIndex, endIndex);
    this.citationsToShow = sliceCitations;
    
    return this.pageEvent;
  }
}