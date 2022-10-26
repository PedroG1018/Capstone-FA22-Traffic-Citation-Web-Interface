import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";

  constructor(private http: HttpClient) { }

  public getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.url}`).pipe(catchError(this.handleError));
  }

  public createUser(user: User) : Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/${this.url}`, user).pipe(catchError(this.handleError));
  }

  public updateUser(user: User) : Observable<User[]> {
    return this.http.put<User[]>(`${environment.apiUrl}/${this.url}`, user).pipe(catchError(this.handleError));
  }

  public deleteUser(user: User) : Observable<User[]> {
    return this.http.delete<User[]>(`${environment.apiUrl}/${this.url}/${user.user_id}`).pipe(catchError(this.handleError));
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
