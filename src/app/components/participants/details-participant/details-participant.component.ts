import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipantsService } from '../../../services/participants.service';
import { Participant } from '../../../models/participant';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-details-participant',
  templateUrl: './details-participant.component.html',
  styleUrls: ['./details-participant.component.css']
})
export class DetailsParticipantComponent implements OnInit {

  title = 'participants';
  titleForPhotos = 'photos';

  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitlesPhotos = ['Url', 'Photo Time', 'Machine', 'Event', 'Session', 'Participant'];
  dataPhoto = [];
  keyAccounts: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Photos', 'Events'];
  // list variables
  dataList;
  dataListKeys;
  // tslint:disable-next-line:max-line-length
  dataListIcons = ['fa fa-tags', 'fa fa-tags', 'fa fa-tags', 'fa fa-envelope', 'fa fa-phone', 'fa fa-venus-mars', 'fa fa-circle-o'];

  constructor(
    private router: Router,
    private eventsService: EventsService,
    private participantsService: ParticipantsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.participantsService.getParticipantDetails(params['id'])
        .subscribe(data => {
          this.eventsService.getEvent().subscribe(event => {
            const events = event;
              // list
                this.dataList = Participant.map(data.participants, events);
                this.dataListKeys = Object.keys(this.dataList[0]);
                // cubes
                  this.cubesData.push(this.dataPhoto.length, this.dataPhoto.length);
                // tables
                  // Photos
                 // this.dataPhoto = Session.map(data.sessions, data.events);
                  // this.keySessions = Object.keys(this.dataPhoto[0]);
          });
        });
      });
  }

  ngOnInit() {
  }

  /*deletePhoto(id) {
    this.sessionService.deleteSession(id)
      .subscribe(data => {
        this.dataSessions.splice(this.dataSessions.indexOf(id), 1);
      });
  }*/

}
