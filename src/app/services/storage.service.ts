import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private localStorageSub = new BehaviorSubject<string>('');

    constructor() {}

    observeStorage(): Observable<any> {
        return this.localStorageSub.asObservable();
    }

    public get darkMode(){
        return localStorage.getItem('darkMode')!;
    }

    public set darkMode(value: string) {
        localStorage.setItem('darkMode', value);
        this.localStorageSub.next(value);
    }
}