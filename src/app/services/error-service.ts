import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";

/**
 *  Class for handling HTTP errors when making API calls to backend
 */

@Injectable({
    providedIn: 'root'
})
export class ErrorHandleService {
    constructor(private router: Router) {}

    public handleError (error: HttpErrorResponse) {
        let errorMessage = "";
        if (error.status === 404) {

        } else if (error.error instanceof ErrorEvent) {
            // Frontend error
            errorMessage = error.error.message;
        } else {
            // Backend error
            errorMessage = `Error Code: ${error.status}\nError Message: ${error.message}`; 
        }
        console.log(errorMessage);

        return throwError((() => {
            return errorMessage;
        }))
    }
}