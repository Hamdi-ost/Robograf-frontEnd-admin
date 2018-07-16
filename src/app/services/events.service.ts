import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  constructor(private http: HttpClient) { }

  addEvent(event) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/events', event, {headers: header});
  }

  getEvent() {
    return this.http.get<any[]>('http://localhost:8000/events')
    .pipe(map(res => res.map(el => Event.map(el))));
  }

  getEventDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/events/' + id );
  }

  deleteEvent(id) {
    return this.http.delete('http://localhost:8000/api/events/' + id);
  }
}
