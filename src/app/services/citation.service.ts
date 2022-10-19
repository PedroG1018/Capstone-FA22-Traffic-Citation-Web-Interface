import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Citation } from '../models/citation';
import { CitationWithViolations } from '../models/citation-with-violations';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private url = "Citation";
  private newUrl = "CitationWithViolations"

  constructor(private http: HttpClient) { }

  public getCitations() : Observable<Citation[]> {
    return this.http.get<Citation[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getCitationsPaginator(pageNumber: number,pageSize: number) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${pageNumber}/${pageSize}`);
  }

  public createCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.post<Citation[]>(`${environment.apiUrl}/${this.url}`, citation);
  }

  // creates a citation with 1 or more violations
  public createCitationWithViolations(citation: CitationWithViolations) : Observable<CitationWithViolations[]> {
    return this.http.post<CitationWithViolations[]>(`${environment.apiUrl}/${this.newUrl}`, citation)
  }

  public updateCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.put<Citation[]>(`${environment.apiUrl}/${this.url}`, citation);
  }

  public deleteCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.delete<Citation[]>(`${environment.apiUrl}/${this.url}/${citation.citation_id}`);
  }
}
