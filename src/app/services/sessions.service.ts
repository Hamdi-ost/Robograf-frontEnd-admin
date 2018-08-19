import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from '../models/session';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  event;

  constructor(private http: HttpClient, private eventService: EventsService) {
    this.eventService.getEvent().subscribe(data => this.event = data);
   }


  addSession(session) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/sessions', session, {headers: header});
  }


  getSessions(): Observable<any> {
    return this.http.get('http://localhost:8000/api/sessions/');
  }

  getSessionDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/sessions/' + id );
  }

  deleteSession(id) {
    return this.http.delete('http://localhost:8000/api/sessions/' + id);
  }


  editSession(id, modifiedSession) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/sessions/' + id, modifiedSession, {headers: header});
  }

}
