import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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
    return this.http.get<Citation[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.handleError));
  }

  public getCitationsPaginator(pageNumber: number,pageSize: number) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/${pageNumber}/${pageSize}`).pipe(catchError(this.handleError));
  }

  public createCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.post<Citation[]>(`${environment.apiUrl}/${this.url}`, citation).pipe(catchError(this.handleError));
  }

  public updateCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.put<Citation[]>(`${environment.apiUrl}/${this.url}`, citation).pipe(catchError(this.handleError));
  }

  public deleteCitation(citation: Citation) : Observable<Citation[]> {
    return this.http.delete<Citation[]>(`${environment.apiUrl}/${this.url}/${citation.citation_id}`).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nError Message: ${error.message}`; 
    }
    console.log(errorMessage);
    return throwError((() => {
      return errorMessage;
    }))
  }
}
