import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citation } from 'src/app/models/citation';
import { Driver } from 'src/app/models/driver';
import { Violation } from 'src/app/models/violation';
import { CitationService } from 'src/app/services/citation.service';
import { DriverService } from 'src/app/services/driver.service';
import { SessionService } from 'src/app/services/session.service';
import { Unsubscriber } from 'src/app/services/unsubscriber';
import { ViolationService } from 'src/app/services/violation.service';

@Component({
  selector: 'app-view-citation-summary',
  templateUrl: './view-citation-summary.component.html',
  styleUrls: ['./view-citation-summary.component.css'],
})
export class ViewCitationSummaryComponent
  extends Unsubscriber
  implements OnInit, OnDestroy
{
  citationId: number = 0;
  citation?: Citation;
  violations?: Violation[];
  driver?: Driver;

  constructor(
    private violationService: ViolationService,
    private driverService: DriverService,
    private session: SessionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.addNewSubscription = this.session.currentCitation.subscribe(
      (citation) => {
        this.citation = citation;
        // Retrieve all violations belonging to Citation
        // this.addNewSubscription = this.violationService
        //   .getViolationsByCitationId(citation?.citation_id!)
        //   .subscribe((result) => {
        //     this.violations = result;
            
        //   });

        // // Retrieve citation driver
        // this.addNewSubscription = this.driverService
        //   .getDriverById(citation?.driver_id!)
        //   .subscribe((result) => {
        //     this.driver = result;
            
        //   });
      }
    );

    this.addNewSubscription = this.session.currentViolations.subscribe(
      (violations) => (this.violations = violations)
    );

    this.addNewSubscription = this.session.currentDriver.subscribe(
      (driver) => (this.driver = driver)
    );

    // Retrieve citation, violations, and driver from session storage
    // Used if page refreshes
    this.retrieveSessionValues();
  }

  retrieveSessionValues() {
    // Parse JSON string from session storage as Citation
    if (sessionStorage.getItem('citation')) {
      this.citation = JSON.parse(
        sessionStorage.getItem('citation') || '{}'
      ) as Citation;
    }

    if (sessionStorage.getItem('violations')) {
      this.violations = JSON.parse(sessionStorage.getItem('violations') || '{}') as Violation[];
    }

    if (sessionStorage.getItem('driver')) {
      this.driver = JSON.parse(sessionStorage.getItem('driver') || '{}') as Driver;
    }
  }
}
