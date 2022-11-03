import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/driver';
import { ErrorHandleService } from './error-service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private url = "Driver";

  constructor(private http: HttpClient, private errorService: ErrorHandleService) { }

  public getDrivers() : Observable<Driver[] | undefined> {
    return this.http.get<Driver[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.errorService.handleError));
  }

  public getDriverById(id: number) : Observable<Driver | undefined> {
    return this.http.get<Driver>(`${environment.apiUrl}/${this.url}/${id}`).pipe(catchError(this.errorService.handleError));
  }

  public getDriverByLicenseNo(license_no: string) : Observable<Driver | undefined> {
    return this.http.get<Driver>(`${environment.apiUrl}/${this.url}/license/${license_no}`).pipe(catchError(this.errorService.handleError));
  }

  public createDriver(driver: Driver) : Observable<Driver | undefined> {
    return this.http.post<Driver>(`${environment.apiUrl}/${this.url}`, driver).pipe(catchError(this.errorService.handleError));
  }

  public updateDriver(driver: Driver) : Observable<Driver | undefined> {
    return this.http.put<Driver>(`${environment.apiUrl}/${this.url}`, driver).pipe(catchError(this.errorService.handleError));
  }

  public deleteDriver(driver: Driver) : Observable<Driver | undefined> {
    return this.http.delete<Driver>(`${environment.apiUrl}/${this.url}/${driver.driver_id}`).pipe(catchError(this.errorService.handleError));
  }
}
