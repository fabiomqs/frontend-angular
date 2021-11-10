import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Entry } from './entry.model';


@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private apiPath: string = "api/entries";

    constructor(
        private http: HttpClient
    ) { }

    getAll():Observable<Entry[]> {
        return this.http
            .get<Entry[]>(this.apiPath);
    }

    getById(id:number):Observable<Entry> {
        const url = `${this.apiPath}/${id}`;
        return this.http
            .get<Entry>(url);
    }

    create(entry: Entry):Observable<Entry> {
        return this.http
            .post<Entry>(this.apiPath, entry);
    }

    update(entry: Entry):Observable<Entry> {
        const url = `${this.apiPath}/${entry.id}`;
        return this.http
            .put<Entry>(url, entry)
            .pipe(
                map(() => entry)
            )
    }

    delete(id:number):Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http
            .delete(url)
            .pipe(
                map(() => null)
            );
    }


    
}
