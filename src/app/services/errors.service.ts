import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Execption } from '../models/exception';
import { MachinesService } from './machines.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  machine;
  constructor(private http: HttpClient, private machinesService: MachinesService) {
    this.machinesService.getMachines().subscribe(data => this.machine = data);
   }

  getPersistentExceptions(): Observable<any> {
    return this.http.get('http://localhost:8000/api/persistentExceptions/')
    .pipe(map(res  => Execption.map(res, this.machine)));
  }

  getPersistentExceptionsDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/persistentExceptions/detailsAsync/' + id);
  }

  dismissAll(): Observable<any> {
    return this.http.get('http://localhost:8000/persistentExceptions/dismiss');
  }

  dismiss(id): Observable<any> {
    return this.http.get('http://localhost:8000/persistentExceptions/dismiss/' + id);
  }

}
