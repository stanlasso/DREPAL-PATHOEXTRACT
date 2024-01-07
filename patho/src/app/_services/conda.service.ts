import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from '../_models/data.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CondaService {
  private baseUrl = `${environment.apiUrl}/conda`;
  headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'applcation/json')
  //http://localhost:3000/api/conda';

  constructor(private http: HttpClient) { }
  fastqc(data: Data): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/fastqc`, data);
  }
  multiqc(data: Data): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/multiqc`, data);
  }
  indexh(data: Data, hote: String): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/indexh`, { 'data': data, 'type': hote });
  }
  checkg(data: Data, hote: String): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/checkg`, { 'data': data, 'type': hote });
  }
  indexp(data: Data, hote: String): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/indexp`, { 'data': data, 'type': hote });
  }
  qc(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/qc`, data);
  }
  dbsub(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/dbsub`, data);
  }
  gncons1(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gncons1`, data);
  }
  gncons2(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gncons2`, data);
  }

  gncons3(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gncons3`, data);
  }
  gncons4(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gncons4`, data);
  }
  gncons5(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gncons5`, data);
  }
  gncons(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/gncons`, data);
  }
  redbsub(data: Data,ngs : any): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/redbsub`, { 'data': data, 'ngs': ngs });
  }
  pipe(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pipe`, data);
  }
  stat(): Observable<any> {
    return this.http.get(`${this.baseUrl}/seqkit`);
  }


}