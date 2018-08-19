import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../../services/sessions.service';
import { Machine } from '../../../models/machine';
import { MachinesService } from '../../../services/machines.service';
import { Session } from '../../../models/session';
import { EventsService } from '../../../services/events.service';
import { Participant } from '../../../models/participant';
import { Photo } from '../../../models/photo';

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.component.html',
  styleUrls: ['./details-session.component.css']
})
export class DetailsSessionComponent implements OnInit {
  titleForListDetails = 'sessions';
  title1 = 'machines';
  title2 = 'participants';
  title3 = 'photos';
  createMachine = '/createMachine';
  createParticipant = '/createParticipant';

  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  // machines
  colTitlesMachines = ['Name', 'Type', 'Status'];
  dataMachines: any[] = [];
  keysMachines: any[];
  // Participants
  colTitlesParticipants = ['Email', 'Name', 'last Name', 'Gender', 'Age', 'Phone', 'Event'];
  dataParticipants: any[] = [];
  keysParticipants: any[];
  // Photos
  colTitlesPhotos = ['Url', 'Photo Time', 'Machine', 'Session', 'Participant', 'Event'];
  dataPhotos: any[] = [];
  keysPhotos: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Remaining', 'Next Session', 'Photos', 'Participants'];
  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['fa fa-circle-o', 'fa fa-calendar', 'fa fa-clock-o', 'fa fa-calendar', 'fa fa-clock-o', 'fa fa-tag'];

  constructor(
    private sessionService: SessionsService,
    private route: ActivatedRoute,
    private machinesService: MachinesService,
    private eventsService: EventsService) {
    this.route.params.subscribe(params => {
        this.sessionService.getSessionDetails(params['id'])
          .subscribe(data => {
            this.eventsService.getEvent().subscribe(event => {
            const events = event;
            // list
            this.dataList = Session.map(data.sessions, events);
            this.dataList.splice(0, 1);
            this.dataListKeys = Object.keys(this.dataList[0]);
            // cubes
            this.cubesData.push(data.remaining_sessions_count, data.nextSession, data.photos_count, data.participants_count);
            // tables
            // machines
            this.dataMachines = Machine.map(data.machines);
            if (this.dataMachines.length > 0) {
            this.keysMachines = Object.keys(this.dataMachines[0]);
            }
            // Participants
            this.dataParticipants = Participant.map(data.participants, events);
            if (this.dataParticipants.length > 0) {
            this.keysParticipants = Object.keys(this.dataParticipants[0]);
            }
            // Photos
            this.dataPhotos = Photo.map(data.photos, data.machines, data.sessions, this.dataParticipants);
            if (this.dataPhotos.length > 0) {
            this.keysPhotos = Object.keys(this.dataPhotos[0]);
            }
      });
    });
  });
  }

  ngOnInit() {
  }

}
