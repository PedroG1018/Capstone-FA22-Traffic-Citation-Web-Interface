import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Citation } from 'src/app/models/citation';
import { CitationWithViolations } from 'src/app/models/citation-with-violations';
import { Violation } from 'src/app/models/violation';
import { CitationService } from 'src/app/services/citation.service';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css'],
})

export class CreateCitationComponent implements OnInit {
  @Input() citation?: Citation;
  @Input() violation?: Violation;
  @Input() citationViolations?: Violation[]
  @Input() citationWithViolations?: CitationWithViolations;
  @Output() citationsCreated = new EventEmitter<Citation[]>();
  @Output() citationsWithViolationsCreated = new EventEmitter<CitationWithViolations[]>();

  citations: Citation[] = [];
  citationsWithViolations: CitationWithViolations[] = [];
  
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString()); 

  productForm: FormGroup;

  constructor(private citationService: CitationService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name:'',
      violations: this.fb.array([]),
    }); 
  }

  ngOnInit(): void {
    this.initNewCitation();
    this.initNewViolation();
    this.initNewCitationViolations();
    this.initNewCitationWithViolations();
  }

  initNewCitation() {
    this.citation = new Citation();
  }

  initNewViolation() {
    this.violation = new Violation();
  }

  initNewCitationViolations() {
    this.citationViolations = [];
  }

  initNewCitationWithViolations() {
    this.citationWithViolations = new CitationWithViolations();
  }

  // original create citation method
  createCitation(citation: Citation) {
    this.citationService.createCitation(citation).subscribe((citations) => this.citationsCreated.emit(citations));
    this.initNewCitation();
  }

  // new create citation method that includes violations
  createCitationWithViolations(citation: Citation, citationViolations: Violation[], citationWithViolations: CitationWithViolations) {
    citationWithViolations.citation = citation;
    citationWithViolations.violations = citationViolations;
    this.citationService.createCitationWithViolations(citationWithViolations).subscribe((citationsWithViolations) => this.citationsWithViolationsCreated.emit(citationsWithViolations));
    this.initNewCitation();
    this.initNewViolation();
    this.initNewCitationWithViolations();
  }

  violations() : FormArray {
    return this.productForm.get("violations") as FormArray;
  }

  newViolation() : FormGroup {
    return this.fb.group({
      group:'',
      code:'',
      degree:'',
      desc: '',
    })
  }

  addViolation() {
    this.violations().push(this.newViolation());
    this.citationViolations?.push(new Violation());
  }

  removeViolation(i: number) {
    this.violations().removeAt(i);
    this.citationViolations?.splice(i, 1);
  }
}
