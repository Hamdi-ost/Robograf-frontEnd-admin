import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventsService } from './events.service';
import { map } from 'rxjs/operators';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor(private http: HttpClient, private eventsService: EventsService) { }

  getTemplates(): Observable<any> {
    let events;
    this.eventsService.getEvent().subscribe(data => events = data);
    return this.http.get('http://localhost:8000/api/templateNegotiations/')
    .pipe(map(res => Template.map(res, events)));
  }

  getTemplateDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/templateNegotiations/' + id );
  }

  deleteTemplate(id) {
    return this.http.delete('http://localhost:8000/api/templateNegotiations/' + id);
  }


}
