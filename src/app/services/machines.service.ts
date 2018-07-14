import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {
  

  constructor(private http:HttpClient) { }
  
  addMachine(machine){
    let header = new HttpHeaders ();
    header.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/machines',machine,{headers:header});
  }

  getMachines(): Observable<any>{
    return this.http.get('http://localhost:8000/machines')
    .pipe(map(res => Machine.map(res)));
    //.pipe(res => res.pipe(map(el=>{Machine.map(el)})));
  }

  getMachineDetails(id): Observable<any>{
    return this.http.get('http://localhost:8000/machines/'+id)
  }

}
