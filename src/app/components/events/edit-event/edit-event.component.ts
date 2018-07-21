import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  name;
  activity;
  location;
  description;
  email_template_id;
  modifiedEvent: Event = new Event();

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private eventsService: EventsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventsService.getEventDetails(params['id'])
        .subscribe(data => {
          this.name = data.events[0].name;
          this.location = data.events[0].location;
          this.activity = data.events[0].subject;
          this.description = data.events[0].description;
          this.email_template_id = data.events[0].email_template_id;
        });
    });
  }

  back() {
    window.history.back();
  }

  ngOnInit() {
  }

  Update() {
    this.modifiedEvent.name = this.name;
    this.modifiedEvent.subject = this.activity;
    this.modifiedEvent.location = this.location;
    this.modifiedEvent.description = this.description;
    this.modifiedEvent.email_template_id = this.email_template_id;

    // Required  Fields
    if (!this.validateService.valideEventRegister(this.modifiedEvent)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email_template_id)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.route.params.subscribe(params => {
      this.eventsService.editEvent(params['id'], this.modifiedEvent)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('Event updated successfully', { cssClass: 'alert-success', timeout: 3000 });
        });
    });
  }

}
