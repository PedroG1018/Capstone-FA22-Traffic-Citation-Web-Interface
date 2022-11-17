import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Citation } from '../models/citation';
import { CitationWithViolations } from '../models/citation-with-violations';
import { ErrorHandleService } from './error-service';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private url = "Citation";
  private newUrl = "CitationWithViolations"

  constructor(private http: HttpClient, private errorService: ErrorHandleService) { }

  public getCitations() : Observable<Citation[] | undefined> {
    return this.http.get<Citation[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.errorService.handleError));
  }

  public getCitationById(citation_id: number) : Observable<Citation | undefined> {
    return this.http.get<Citation>(`${environment.apiUrl}/${this.url}/${citation_id}`).pipe(catchError(this.errorService.handleError));
  }

  public getCitationsPaginator(pageNumber: number, pageSize: number, userId: string, userRole: string) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${pageNumber}/${pageSize}/${userId}/${userRole}`).pipe(catchError(this.errorService.handleError));
  }

  public createCitation(citation: Citation) : Observable<Citation | undefined> {
    return this.http.post<Citation>(`${environment.apiUrl}/${this.url}`, citation).pipe(catchError(this.errorService.handleError));
  }

  // creates a citation with 1 or more violations
  public createCitationWithViolations(citation: CitationWithViolations) : Observable<Citation | undefined> {
    return this.http.post<Citation>(`${environment.apiUrl}/${this.newUrl}`, citation).pipe(catchError(this.errorService.handleError));
  }

  public updateCitation(citation: Citation) : Observable<Citation | undefined> {
    return this.http.put<Citation>(`${environment.apiUrl}/${this.url}`, citation).pipe(catchError(this.errorService.handleError));
  }

  public deleteCitation(citation: Citation) : Observable<Citation | undefined> {
    return this.http.delete<Citation>(`${environment.apiUrl}/${this.url}/${citation.citation_id}`).pipe(catchError(this.errorService.handleError));
  }
}
