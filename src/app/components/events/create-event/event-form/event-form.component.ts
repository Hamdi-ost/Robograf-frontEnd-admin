import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { Event } from '../../../../models/event';
import { EventsService } from '../../../../services/events.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  @Output() eventForm: EventEmitter<any> = new EventEmitter<any>();

  event = {
    name: null,
    subject: null,
    location: null,
    author_id: null,
    email_template_id: null,
    description: null
  };

  constructor(private eventService: EventsService) {

  }

  ngOnInit() {
  }

  send() {
    this.eventForm.emit(this.event);
  }

}
