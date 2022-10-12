import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css'],
})

export class CreateCitationComponent implements OnInit {
  @Input() citation?: Citation;
  @Output() citationsCreated = new EventEmitter<Citation[]>();

  citations: Citation[] = [];
  
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString()); 

  constructor(private citationService: CitationService) { }

  ngOnInit(): void {
    this.initNewCitation();
  }

  initNewCitation() {
    this.citation = new Citation();
  }

  createCitation(citation: Citation) {
    this.citationService.createCitation(citation).subscribe((citations) => this.citationsCreated.emit(citations));
    this.initNewCitation();
  }

}
