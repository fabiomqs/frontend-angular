import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private apiPath: string = "api/categories";

    constructor(
        private http: HttpClient
    ) { }

    getAll():Observable<Category[]> {
        return this.http
            .get<Category[]>(this.apiPath);
            
    }

    getById(id:number):Observable<Category> {
        const url = `${this.apiPath}/${id}`;
        return this.http
            .get<Category>(url);
    }

    create(category: Category):Observable<Category> {
        return this.http
            .post<Category>(this.apiPath, category);
    }

    update(category: Category):Observable<Category> {
        const url = `${this.apiPath}/${category.id}`;
        return this.http
            .put<Category>(url, category)
            .pipe(
                map(() => category)
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
