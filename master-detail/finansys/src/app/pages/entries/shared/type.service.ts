import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Type } from "./type.model";

@Injectable({
    providedIn: 'root'
})
export class TypeService {

    private apiPath: string = "api/types";

    constructor(
        private http: HttpClient
    ) { }

    getAll():Observable<Type[]> {
        return this.http
            .get<Type[]>(this.apiPath);
    }

    getById(id:number):Observable<Type> {
        const url = `${this.apiPath}/${id}`;
        return this.http
            .get<Type>(url);
    }
}