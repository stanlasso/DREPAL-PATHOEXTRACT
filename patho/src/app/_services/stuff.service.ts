import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { Thing } from '../models/Thing.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  constructor(private http: HttpClient) {}

  uploadFile(file: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/data/upload', file).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
