import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EventsService } from './events.service';
import { map } from 'rxjs/operators';
import { Template } from '../models/template';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  events;
  constructor(private http: HttpClient, private eventsService: EventsService, private route: ActivatedRoute) {
    this.eventsService.getEvent().subscribe(data => this.events = data);
  }

  getTemplateNegotiations(): Observable<any> {
    return this.http.get('http://localhost:8000/api/templateNegotiations/')
      .pipe(map(res => Template.map(res, this.events)));
  }

  getTemplateNegotiationsDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/templateNegotiations/' + id);
  }

  deleteTemplate(id) {
    return this.http.delete('http://localhost:8000/api/templateNegotiations/' + id);
  }

  // ------------------------------------

  getTemplate(): Observable<any> {
    return this.http.get('http://localhost:8000/api/templates/')
    .pipe(map(res => Template.map2(res)));
  }

  close(id) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let template;
    this.getTemplateNegotiationsDetails(id).subscribe(data => template = data.template_negotiation);
    return this.http.post('http://localhost:8000/api/templateNegotiations/' + id + '/close', template, { headers: header });
  }

  open(id) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    let template;
    this.getTemplateNegotiationsDetails(id).subscribe(data => template = data.template_negotiation);
    return this.http.post('http://localhost:8000/api/templateNegotiations/' + id + '/open', template, { headers: header });
  }


}
