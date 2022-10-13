import { Component, OnInit, ViewChild } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { CitationDataSource } from 'src/app/data/CitationDataSource';

@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css'],
})
export class ViewCitationsComponent implements OnInit {
  citations: Citation[] = [];
  citationToEdit?: Citation;
  dataSource!: CitationDataSource;

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

  constructor(private citationService: CitationService) {}

  ngOnInit(): void {
    this.citationService
      .getCitations()
      .subscribe((result: Citation[]) => (this.citations = result));
    
    this.dataSource = new CitationDataSource(this.citationService);
    this.dataSource.loadCitations();
  }

  editCitation(citation: Citation) {
    this.citationToEdit = citation;
  }

  updateCitationList(citations: Citation[]) {
    this.citations = citations;
  }

  // Use to later display modal to display or edit that citation
  onRowCLicked(row) {
    console.log('Row Clicked', row);
  }
}