import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Citation } from '../models/citation';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private url = "Citation";

  constructor(private http: HttpClient) { }

  public getCitations() : Observable<Citation[]> {
    return this.http.get<Citation[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.post<Citation[]>(`${environment.apiUrl}/${this.url}`, citation);
  }

  public updateCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.put<Citation[]>(`${environment.apiUrl}/${this.url}`, citation);
  }

  public deleteCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.delete<Citation[]>(`${environment.apiUrl}/${this.url}/${citation.citation_id}`);
  }
}
