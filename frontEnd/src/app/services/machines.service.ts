import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  

  constructor(private http:HttpClient) { }
  
  getMachines(): Observable<any>{
    return this.http.get('http://localhost:8000/machines')
    .pipe(map(res => Machine.map(res)));
     
  }

}
