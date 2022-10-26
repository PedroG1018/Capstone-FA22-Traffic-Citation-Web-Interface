import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private url = "Driver";

  constructor(private http: HttpClient) { }

  public getDrivers() : Observable<Driver[]> {
    return this.http.get<Driver[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.handleError));
  }

  public createDriver(driver: Driver) : Observable<Driver[]> {
    return this.http.post<Driver[]>(`${environment.apiUrl}/${this.url}`, driver).pipe(catchError(this.handleError));
  }

  public updateDriver(driver: Driver) : Observable<Driver[]> {
    return this.http.put<Driver[]>(`${environment.apiUrl}/${this.url}`, driver).pipe(catchError(this.handleError));
  }

  public deleteDriver(driver: Driver) : Observable<Driver[]> {
    return this.http.delete<Driver[]>(`${environment.apiUrl}/${this.url}/${driver.driver_id}`).pipe(catchError(this.handleError));
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
