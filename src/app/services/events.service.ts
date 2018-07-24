import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Event } from '../models/event';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  constructor(private http: HttpClient, private usersService: UsersService) { }

  addEvent(event) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/events', event, {headers: header});
  }

  getEvent() {
    let users;
    this.usersService.getUsers().subscribe(data => users = data);
    return this.http.get<any[]>('http://localhost:8000/api/events')
    .pipe(map(res  => Event.map(res, users))
    );
  }

  getEventDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/events/' + id );
  }

  deleteEvent(id) {
    return this.http.delete('http://localhost:8000/api/events/' + id);
  }

  editEvent(id, modifiedEvent) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/events/' + id, modifiedEvent, {headers: header});
  }
}
