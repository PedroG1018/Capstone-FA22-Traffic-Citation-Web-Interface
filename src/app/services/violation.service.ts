import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Violation } from "../models/violation";

@Injectable({
    providedIn: 'root'
})
export class ViolationService {
    private url = "Violation";

    constructor(private http: HttpClient) { }

    public getViolations() : Observable<Violation[]> {
        return this.http.get<Violation[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.handleError));
    }

    public createViolation(violation: Violation) : Observable<Violation[]> {
        return this.http.post<Violation[]>(`${environment.apiUrl}/${this.url}`, violation).pipe(catchError(this.handleError));
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