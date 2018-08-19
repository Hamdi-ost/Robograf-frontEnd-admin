import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../../services/sessions.service';
import { Session } from '../../models/session';
import { EventsService } from '../../services/events.service';
import { StaticService } from '../../services/static.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  title = 'sessions';
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  colTitles = ['Number', 'Start Data', 'Start Time', 'End Time', 'End Date', 'Description', 'Event'];
  data: any[];
  keys: any[];
  createLink = '/createSession';

  constructor(private sessionsService: SessionsService, private eventsService: EventsService,
    private staticService: StaticService) {
    // stat
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
    this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);

    this.sessionsService.getSessions()
    .subscribe(data => {
      this.eventsService.getEvent().subscribe(event => {
      const events = event ;
      this.data = Session.map(data, events).reverse();
      this.keys = Object.keys(this.data[0]);
        }
      );
    });
  }

  ngOnInit() {
  }

  deleteSession (id) {
    this.sessionsService.deleteSession(id)
    .subscribe(data => {
      this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
    });
  }

}
