import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  title = 'events';
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  colTitles = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  data: any[];
  keys: any[];
  createLink = '/createEvent';

  constructor(private eventService: EventsService) {
    this.eventService.getEvent()
    .subscribe(data => {
      this.data = data;
      this.keys = Object.keys(this.data[0]);
        }
      );
  }

  ngOnInit() {
  }

  deleteEvent (id) {
    this.eventService.deleteEvent(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

}
