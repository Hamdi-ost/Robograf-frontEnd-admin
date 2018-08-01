import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {


  constructor(private http: HttpClient) { }

  addMachine(machine) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/machines', machine, {headers: header});
  }

  getMachines() {
    return this.http.get<any[]>('http://localhost:8000/api/machines')
    .pipe(map(res => Machine.map(res)));
  }

  getMachineDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/machines/' + id);
  }

  deleteMachine(id) {
    return this.http.delete('http://localhost:8000/api/machines/' + id);
  }

  editMachine(id, modifiedMachine) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/machines/' + id, modifiedMachine, {headers: header});
  }

  activateMachine(id) {
    return this.http.get('http://localhost:8000/api/machines/' + id + '/activate');
  }

  desactivateMachine(id) {
    return this.http.get('http://localhost:8000/api/machines/' + id + '/desactivate');
  }

}
