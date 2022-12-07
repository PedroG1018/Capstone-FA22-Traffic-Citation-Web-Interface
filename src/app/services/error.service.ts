import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';

/**
 *  Class for handling HTTP errors when making API calls to backend
 *  Refer to: https://angular.io/guide/http#logging
 */

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleService {
  constructor(private snackBar: MatSnackBar) {}

  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 404) {
      // Not found so return undefined
      return of(undefined);
    } else if(error.status === 400) {
      return of(undefined);
    } else if (error.error instanceof ErrorEvent) {
      // Frontend error
      errorMessage = error.error.message;
    } else {
      // Backend error
      errorMessage = `Backend Error Code: ${error.status}\nError Message: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(() => {
      // this.snackBar.open(errorMessage, '', { duration: 2800 });
      return errorMessage;
    });
  }
}
