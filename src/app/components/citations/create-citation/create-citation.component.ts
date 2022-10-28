import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Citation } from 'src/app/models/citation';
import { CitationWithViolations } from 'src/app/models/citation-with-violations';
import { Violation } from 'src/app/models/violation';
import { CitationService } from 'src/app/services/citation.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';

@Component({
  selector: 'app-create-citation',
  templateUrl: './create-citation.component.html',
  styleUrls: ['./create-citation.component.css'],
})

export class CreateCitationComponent extends Unsubscriber implements OnInit {
  @Input() citation?: Citation;
  @Input() violation?: Violation;
  @Input() citationViolations?: Violation[]
  @Input() citationWithViolations?: CitationWithViolations;
  @Output() citationsCreated = new EventEmitter<Citation[]>();
  @Output() citationsWithViolationsCreated = new EventEmitter<CitationWithViolations[]>();

  driverId?: number;

  citations: Citation[] = [];
  citationsWithViolations: CitationWithViolations[] = [];
  
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString()); 

  productForm: FormGroup;

  constructor(private citationService: CitationService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
    super()
    this.productForm = this.fb.group({
      name:'',
      violations: this.fb.array([]),
    }); 
  }

  ngOnInit(): void {
    // Get driverId from previously created driver
    this.route.params.subscribe(params => {
      this.driverId = params['id'];
    });
    
    this.citation = new Citation();
    this.citation.driver_id = this.driverId;

    this.violation = new Violation();
    this.citationViolations = [];
    this.citationWithViolations = new CitationWithViolations();
  }

  // new create citation method that includes violations
  createCitationWithViolations(citation: Citation, citationViolations: Violation[], citationWithViolations: CitationWithViolations) {
    citationWithViolations.citation = citation;
    citationWithViolations.violations = citationViolations;
    this.addNewSubscription = this.citationService.createCitationWithViolations(citationWithViolations).subscribe(citationsWithViolations => {
      this.citationsWithViolationsCreated.emit(citationsWithViolations);
      this._snackBar.open("Successfully Created Traffic Citation", '', { duration: 2800 });
      this.router.navigate(['/view-citations']);
    });
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
