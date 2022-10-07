import { Component, OnInit } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-view-citations',
  templateUrl: './view-citations.component.html',
  styleUrls: ['./view-citations.component.css']
})
export class ViewCitationsComponent implements OnInit {
  citations: Citation[] = [];
  citationToEdit?: Citation;

  constructor(private citationService: CitationService) { }

  ngOnInit(): void {
    this.citationService
      .getCitations()
      .subscribe((result: Citation[]) => (this.citations = result));
  }

  editCitation(citation: Citation) {
    this.citationToEdit = citation;
  }

  updateCitationList(citations: Citation[]) {
    this.citations = citations;
  }

}
