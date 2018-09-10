import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../models/photo';
import { MachinesService } from './machines.service';
import { SessionsService } from './sessions.service';
import { ParticipantsService } from './participants.service';
import { EventsService } from './events.service';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  machines;
  participants;
  eventSession;
  event;

  constructor(private http: HttpClient,
    private machinesService: MachinesService,
    private sessionsService: SessionsService,
    private participantsService: ParticipantsService) {
      this.getData();
    }

    getData() {
      this.machinesService.getMachines().subscribe(data => this.machines = data);
      this.participantsService.getParticipant().subscribe(data => this.participants = data);
      this.sessionsService.getSessions().subscribe(data => this.eventSession =  data);
    }

  addPhoto(photo) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/photos', photo, {headers: header});
  }

  getPhoto() {
    this.getData();
    return this.http.get<any[]>('http://localhost:8000/api/photos')
    .pipe(map(res  => Photo.map(res, this.machines, this.eventSession, this.participants))
    );
  }

  getPhotoDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/photos/' + id );
  }

  deletePhoto(id) {
    return this.http.delete('http://localhost:8000/api/photos/' + id);
  }

  editPhoto(id, modifiedPhoto) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/photos/' + id, modifiedPhoto, {headers: header});
  }
}
