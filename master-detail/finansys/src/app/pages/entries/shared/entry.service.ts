import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service';
import { TypeService } from './type.service';


@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private apiPath: string = "api/entries";

    constructor(
        private http: HttpClient,
        private categoryService: CategoryService,
        private typeService: TypeService
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
        return this.categoryService.getById(entry.categoryId)
            .pipe(mergeMap(category => {
                entry.category = category;
                return this.typeService.getById(entry.typeId)
                    .pipe(mergeMap(type => {
                        entry.type = type;
                        return this.http
                            .post<Entry>(this.apiPath, entry);
                    }))
        }));
    }

    update(entry: Entry):Observable<Entry> {
        const url = `${this.apiPath}/${entry.id}`;

        return this.categoryService.getById(entry.categoryId)
            .pipe(mergeMap(category => {
                entry.category = category;
                return this.typeService.getById(entry.typeId)
                    .pipe(mergeMap(type => {
                        entry.type = type;
                        return this.http
                            .put<Entry>(url, entry).pipe(map(() => entry));
                    }))
        }));
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
