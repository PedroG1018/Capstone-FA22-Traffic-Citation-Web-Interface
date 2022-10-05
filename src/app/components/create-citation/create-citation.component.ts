import { Component, OnInit } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css']
})
export class CreateCitationComponent implements OnInit {
  citations: Citation[] = [];
  citationToEdit?: Citation;

  constructor(private citationService: CitationService) { }

  ngOnInit(): void {
    this.citationService
      .getCitations()
      .subscribe((result: Citation[]) => (this.citations = result));
  }

  initNewCitation() {
    this.citationToEdit = new Citation();
  }

  editCitation(citation: Citation) {
    this.citationToEdit = citation;
  }

  updateCitationList(citations: Citation[]) {
    this.citations = citations;
  }

}
