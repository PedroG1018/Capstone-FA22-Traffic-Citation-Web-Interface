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
}
