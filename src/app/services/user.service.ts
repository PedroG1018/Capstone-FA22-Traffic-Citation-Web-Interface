import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ErrorHandleService } from './error-service';

// TODO: DELETE

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";

  constructor(private http: HttpClient, private errorService: ErrorHandleService) { }

  public getUsers() : Observable<User[] | undefined> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.errorService.handleError));
  }

  public createUser(user: User) : Observable<User[] | undefined> {
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url}`, user).pipe(catchError(this.errorService.handleError));
  }

  public updateUser(user: User) : Observable<User[] | undefined> {
    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}`, user).pipe(catchError(this.errorService.handleError));
  }

  public deleteUser(user: User) : Observable<User[] | undefined> {
    return this.http.delete<User[]>(`${environment.apiUrl}/${this.url}/${user.user_id}`).pipe(catchError(this.errorService.handleError));
  }
}
