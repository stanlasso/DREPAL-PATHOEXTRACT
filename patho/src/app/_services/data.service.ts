import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Data } from '../_models/data.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class dataService {


    private baseUrl = `${environment.apiUrl}/sequence`;
    private baseUrlReference = `${environment.apiUrl}/reference`;
    private baseUrlParam = `${environment.apiUrl}/parameter`;
    constructor(private http: HttpClient) { }

    add(data: Data, file: String): Observable<any> {
        //return this.http.get(`${this.baseUrl}/files/${folder}`);
        return this.http.post<Data>(`${this.baseUrl}/add`, { "data": data, "type": file });
    }
    list(): Observable<any> {
        return this.http.get(`${this.baseUrl}/read`);
    }
    listTrimmed(): Observable<any> {
        return this.http.get(`${this.baseUrl}/readTrimme`);
    }
    delete(data: Data): Observable<any> {
        return this.http.delete(`${this.baseUrl}/list/${data.name}`);
    }
    listParam(): Observable<any> {
        return this.http.get(`${this.baseUrlParam}/list`);
    }
    createParam(data: any): Observable<any> {
        return this.http.post(`${this.baseUrlParam}/add`, data);
    }
    updateParam(data: any): Observable<any> {
        return this.http.patch(`${this.baseUrlParam}/update`, data);
    }
    deleteParam(data: any): Observable<any> {
        return this.http.delete(`${this.baseUrlParam}/delete/${data}`);
    }
    listRef(): Observable<any> {
        return this.http.get(`${this.baseUrlReference}/list`);
    }
    getParam(data: String): Observable<any> {
        return this.http.get(`${this.baseUrlParam}/param/${data}`);
    }

}