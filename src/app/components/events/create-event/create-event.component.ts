import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  index =  0;
  stat = ['Total Event' , 'Total Sessions', 'Total Participants', 'Total Photos'];
  valStat = [1,2,3,4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  constructor(private eventService: EventsService) { }

  ngOnInit() {
  }

  increment() {
    this.index++;
  }

  decrement() {
    this.index--;
  }

  addEvent() {
    // bthis.eventService.addEvent(this.event)
  }

  OnEventChanged(event) {
    console.log(event);
  }

}
