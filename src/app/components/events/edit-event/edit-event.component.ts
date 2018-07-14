import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';

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

  constructor(private eventsService: EventsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventsService.getEventDetails(params['id'])
      .subscribe(data => {
        this.name=data.events[0].name;
        this.location=data.events[0].location;
        this.activity=data.events[0].subject;
        this.description=data.events[0].description;
        this.email_template_id=data.events[0].email_template_id;
      })
   })
  }

  OnSubmit(){
    console.log('j')
  }

  ngOnInit() {
  }

}
