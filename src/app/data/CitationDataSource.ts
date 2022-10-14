import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Citation } from "../models/citation";
import { CitationService } from "../services/citation.service";

export class CitationDataSource implements DataSource<Citation> {
    
    private citationsSubject = new BehaviorSubject<Citation[]>([]);  
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private citationService: CitationService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<readonly Citation[]> {
        return this.citationsSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
        this.citationsSubject.complete();
        this.loadingSubject.complete();
    }

    loadCitations() {
        // Loading indicator stops when citations are loaded in, true at begin loading
        this.loadingSubject.next(true);
        this.citationService
            .getCitations()
            .pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
            .subscribe((citations) => this.citationsSubject.next(citations));
    }
}