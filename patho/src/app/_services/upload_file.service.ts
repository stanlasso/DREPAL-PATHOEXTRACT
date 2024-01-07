import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Data } from '../_models/data.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private baseUrl = `${environment.apiUrl}/data`;
  datalist: any = [];
  datalists: any = {};
  constructor(private http: HttpClient) { }

  upload(file: File, folder: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${folder}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(folder: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${folder}`);
  }

  deleteFiles(data: Data, type: string): Observable<any> {
    return this.http.post<Data>(`${this.baseUrl}/delete`, { "data": data, "type": type });
  }
  downloadFiles(data: Data): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${data}`);
  }
  downloadGraph(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/dwlgraph/${data}`,{responseType:`blob`});
  }
}