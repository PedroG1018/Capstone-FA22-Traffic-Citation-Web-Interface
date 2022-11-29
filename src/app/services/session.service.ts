import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Citation } from '../models/citation';
import { Driver } from '../models/driver';
import { Violation } from '../models/violation';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnInit {
  private citation?: Citation;
  private violations?: Violation[];
  private driver?: Driver;

  private citationSource = new BehaviorSubject(this.citation);
  private violationsSource = new BehaviorSubject(this.violations);
  private driverSource = new BehaviorSubject(this.driver);

  currentCitation = this.citationSource.asObservable();
  currentViolations = this.violationsSource.asObservable();
  currentDriver = this.driverSource.asObservable();

  constructor() {
  }

    ngOnInit(): void {
    
  }

  // Change currently loaded citation
  changeCitation(citation: Citation) {
    this.citationSource.next(citation);
    // Store in session too
    sessionStorage.setItem('citation', JSON.stringify(citation));
  }

  changeViolations(violations: Violation[]) {
    this.violationsSource.next(violations);
    sessionStorage.setItem('violations', JSON.stringify(violations));
  }

  changeDriver(driver: Driver) {
    this.driverSource.next(driver);
    sessionStorage.setItem('driver', JSON.stringify(driver));
  }
}
