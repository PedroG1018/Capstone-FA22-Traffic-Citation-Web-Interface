import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

// Referenced Angular Material 7 Docs to create this class

export class InputErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null, 
        form: FormGroupDirective | NgForm | null
        ): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.dirty && control.invalid || isSubmitted);
    }
}