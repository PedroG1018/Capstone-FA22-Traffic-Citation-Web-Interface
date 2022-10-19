import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Violation } from "../models/violation";

@Injectable({
    providedIn: 'root'
})
export class ViolationService {
    private url = "Violation";

    constructor(private http: HttpClient) { }

    public getViolations() : Observable<Violation[]> {
        return this.http.get<Violation[]>(`${environment.apiUrl}/${this.url}`);
    }

    public createViolation(violation: Violation) : Observable<Violation[]> {
        return this.http.post<Violation[]>(`${environment.apiUrl}/${this.url}`, violation);
    }
}