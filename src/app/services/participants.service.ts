import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EventsService } from './events.service';
import { Participant } from '../models/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  events;
  constructor(private http: HttpClient, private eventsService: EventsService) {
    this.events = this.eventsService.getEvent().toPromise().then(data => {
      return data; });
  }


  addParticipant(participants) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/participants', participants, {headers: header});
  }

  getParticipant() {
    // this.events.then(data => console.log(data))
    return this.http.get<any[]>('http://localhost:8000/api/participants')
    .pipe(map(res  => Participant.map(res, this.events))
    );
  }

  getNumberParticipant () {
    return this.http.get<any[]>('http://localhost:8000/api/participants');
  }

  getParticipantDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/participants/' + id );
  }

  deleteParticipant(id) {
    return this.http.delete('http://localhost:8000/api/participants/' + id);
  }

  editParticipant(id, modifiedEvent) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/participants/' + id, modifiedEvent, {headers: header});
  }

}
