import { Injectable } from '@angular/core';
import { EventsService } from './events.service';
import { RepresentantsService } from './representants.service';
import { AccountsService } from './accounts.service';
import { ParticipantsService } from './participants.service';
import { PhotosService } from './photos.service';
import { CompaniesService } from './companies.service';
import { SessionsService } from './sessions.service';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StaticService {


  constructor(private eventService: EventsService,
    private representantsService: RepresentantsService,
    private accountService: AccountsService,
    private participantsService: ParticipantsService,
    private photosService: PhotosService,
    private companiesService: CompaniesService,
    private sessionService: SessionsService,
    private http: HttpClient) { }

  getmachineStatic() {
    return this.http.get('http://localhost:8000/api/machineStatic/');
  }

  getTotalRepresentant() {
    return this.representantsService.getRepresentant().toPromise().then(data => {
      return data.length;
    });
  }

  getTotalAccount() {
    return this.accountService.getAccount().toPromise().then(data => {
      return data.length;
    });
  }

  getTotalCompany() {
    return this.companiesService.getCompany().toPromise().then(data => {
      return data.length;
    });
  }

  getTotalEvent() {
    return this.eventService.getEvent().toPromise().then(data => {
      return data.length;
    });
  }

  getTotalSession() {
    return this.sessionService.getSessions().toPromise().then(data => {
      return data.sessions.length;
    });
  }

  getTotalParticipant() {
    return this.participantsService.getNumberParticipant().toPromise().then(data => {
      return data.length;
    });
  }

  getTotalPhoto() {
    return this.photosService.getPhoto().toPromise().then(data => {
      return data.length;
    });
  }
}
