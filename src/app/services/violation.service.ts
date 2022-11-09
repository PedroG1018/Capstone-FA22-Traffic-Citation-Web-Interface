import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Violation } from "../models/violation";
import { ErrorHandleService } from "./error-service";

@Injectable({
    providedIn: 'root'
})
export class ViolationService {
    private url = "Violation";

    constructor(private http: HttpClient, private errorService: ErrorHandleService) { }

    public getViolations() : Observable<Violation[] | undefined> {
        return this.http.get<Violation[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.errorService.handleError));
    }

    public getViolationsByCitationId(citation_id: number) : Observable<Violation[] | undefined> {
        return this.http.get<Violation[]>(`${environment.apiUrl}/${this.url}/${citation_id}`).pipe(catchError(this.errorService.handleError));
    }

    public createViolation(violation: Violation) : Observable<Violation[] | undefined> {
        return this.http.post<Violation[]>(`${environment.apiUrl}/${this.url}`, violation).pipe(catchError(this.errorService.handleError));
    }
}