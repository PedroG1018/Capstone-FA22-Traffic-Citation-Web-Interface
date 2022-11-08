import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';
import { CitationService } from 'src/app/services/citation.service';
import { DriverService } from 'src/app/services/driver.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { ViolationService } from 'src/app/services/violation.service';

@Component({
  selector: 'app-view-citation-summary',
  templateUrl: './view-citation-summary.component.html',
  styleUrls: ['./view-citation-summary.component.css']
})
export class ViewCitationSummaryComponent extends Unsubscriber implements OnInit {
  citationId: number = 0;
  citation?: Citation;
  violations?: Violation[];
  driver?: Driver;

  constructor(private route: ActivatedRoute, private citationService: CitationService, private violationService: ViolationService, private driverService: DriverService) {
    super();
  }

  ngOnInit(): void {
    // TODO: Pass object instead of id as route param

    // Get citation from route params (from when citation was created)
    this.route.params.subscribe(params => {
      this.citationId = params['id'];
      
      // Retrieve Citation
      this.addNewSubscription = this.citationService.getCitationById(this.citationId).subscribe(result => {
        this.citation = result;
      });

      // Retrieve all violations belonging to Citation
      this.addNewSubscription = this.violationService.getViolationsByCitationId(this.citationId).subscribe(result => {
        this.violations = result;
      })

      this.addNewSubscription = this.driverService.getDriverById(this.citation?.driver_id!).subscribe(result => {
        this.driver = result;
      })
    });

    
  }

}
