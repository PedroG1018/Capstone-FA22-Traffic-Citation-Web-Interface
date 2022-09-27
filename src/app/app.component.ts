import { Component } from '@angular/core';
import { Citation } from './models/citation';
import { CitationService } from './services/citation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrafficCitation.UI';
  citations: Citation[] = [];

  constructor(private citationService: CitationService) {}

  ngOnInit() : void {
    this.citationService
      .getCitations()
      .subscribe((result: Citation[]) => (this.citations = result));
  }
}
