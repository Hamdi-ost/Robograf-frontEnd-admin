import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  

  constructor(private http:HttpClient) { }
  
  addEvent(event){
    let header = new HttpHeaders ();
    header.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/events',event,{headers:header});
  }

  getEvent(): Observable<any>{
    return this.http.get('http://localhost:8000/events')
    .pipe(map(res => Event.map(res)));
    //.pipe(res => res.pipe(map(el=>{Machine.map(el)})));
  }

  getEventDetails(id): Observable<any>{
    return this.http.get('http://localhost:8000/events/'+id)
  }
}
