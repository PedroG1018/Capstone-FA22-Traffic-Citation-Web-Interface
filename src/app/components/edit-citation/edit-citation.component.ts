import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Citation } from 'src/app/models/citation';
import { CitationService } from 'src/app/services/citation.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-citation',
  templateUrl: './edit-citation.component.html',
  styleUrls: ['./edit-citation.component.css']
})
export class EditCitationComponent implements OnInit {
  @Input() citation?: Citation;
  @Output() citationsUpdated = new EventEmitter<Citation[]>();


  constructor(private citationService: CitationService) { }

  ngOnInit(): void {
  }
  
  // Call citation.service methods to perform CRUD operations here
  createCitation(citation: Citation) {
    this.citationService.createCitation(citation).subscribe((citations: Citation[]) => this.citationsUpdated.emit(citations));
  }

  updateCitation(citation: Citation) {
    this.citationService.updateCitation(citation).subscribe((citations: Citation[]) => this.citationsUpdated.emit(citations));
  }

  deleteCitation(citation:Citation) {
    this.citationService.deleteCitation(citation).subscribe((citations: Citation[]) => this.citationsUpdated.emit(citations));
  }
}
