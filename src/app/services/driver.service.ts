import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<Driver[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createDriver(driver: Driver) : Observable<Driver[]> {
    return this.http.post<Driver[]>(`${environment.apiUrl}/${this.url}`, driver);
  }

  public updateDriver(driver: Driver) : Observable<Driver[]> {
    return this.http.put<Driver[]>(`${environment.apiUrl}/${this.url}`, driver);
  }

  public deleteDriver(driver: Driver) : Observable<Driver[]> {
    return this.http.delete<Driver[]>(`${environment.apiUrl}/${this.url}/${driver.driver_id}`);
  }
}
