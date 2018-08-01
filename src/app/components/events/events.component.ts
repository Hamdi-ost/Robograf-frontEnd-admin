import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { SessionsService } from '../../services/sessions.service';
import { ParticipantsService } from '../../services/participants.service';
import { PhotosService } from '../../services/photos.service';
import { StaticService } from '../../services/static.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  title = 'events';
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  colTitles = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  data: any[];
  keys: any[];
  createLink = '/createEvent';

  constructor(private eventService: EventsService,
    private staticService: StaticService,
  private participantsService: ParticipantsService) {


    // stat
   // this.participantsService.getNumberParticipant().subscribe(data => console.log(data.length));
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
     this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    // console.log(this.participantsService.getParticipant());
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);

    this.eventService.getEvent()
      .subscribe(data => {
        this.data = data.reverse();
        this.keys = Object.keys(this.data[0]);
      }
      );
  }

  ngOnInit() {
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id)
      .subscribe(data => {
        this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
      });
  }

}
