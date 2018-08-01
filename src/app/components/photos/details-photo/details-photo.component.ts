import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../../services/sessions.service';
import { EventsService } from '../../../services/events.service';
import { ParticipantsService } from '../../../services/participants.service';
import { Participant } from '../../../models/participant';
import { Photo } from '../../../models/photo';
import { MachinesService } from '../../../services/machines.service';
import { PhotosService } from '../../../services/photos.service';
import { Session } from '../../../models/session';
import { Event } from '../../../models/event';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-details-photo',
  templateUrl: './details-photo.component.html',
  styleUrls: ['./details-photo.component.css']
})
export class DetailsPhotoComponent implements OnInit {

  titleForSession = 'sessions';
  titleForListDetails = 'photos';
  titleForParticipant = 'participants';
  titleForEvent = 'events';

  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitlesS = ['Number', 'Start Data', 'Start Time', 'End Time', 'End Date', 'Description', 'Event'];
  colTitlesE = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  colTitlesP = ['Name', 'last Name', 'Gender', 'Email', 'Age', 'Phone', 'Event'];
  repLength;
  dataSession = [];
  dataParticipant = [];
  dataEvent = [];
  keySession: any[];
  keyParticipant: any[];
  keyEvent: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Event', 'Session', 'Participants'];
  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['', 'fa fa-link', 'fa fa-clock-o', 'fa fa-gear', 'fa fa-tag', 'fa fa-cube', 'fa fa-user'];

  constructor(
    private router: Router,
    private participantService: ParticipantsService,
    private eventService: EventsService,
    private usersService: UsersService,
    private sessionService: SessionsService,
    private machineService: MachinesService,
    private photosService: PhotosService,
    private route: ActivatedRoute) {
    let machines;
    let users;
    this.usersService.getUsers().subscribe(data => users = data);
    this.machineService.getMachines().subscribe(data => machines = data);
    this.route.params.subscribe(params => {
      this.photosService.getPhotoDetails(params['id'])
        .subscribe(data => {
          // list
          this.dataList = Photo.map(data.photos, machines, data.sessions, data.participants);
          this.dataList[0].event = this.dataList[0].event.name;
          this.dataListKeys = Object.keys(this.dataList[0]);
          // cubes
          // tables
          // Sessions
          this.dataSession = Session.map(data.sessions, data.events);
          if (this.dataSession.length > 0) {
            this.keySession = Object.keys(this.dataSession[0]);
          }

          // Event
          this.dataEvent = Event.map(data.events, users);
          if (this.dataEvent.length > 0) {
            this.keyEvent = Object.keys(this.dataEvent[0]);
          }

          // Participant
          this.dataParticipant = Participant.map(data.participants, data.events);
          if (this.dataParticipant.length > 0) {
            this.keyParticipant = Object.keys(this.dataParticipant[0]);
          }
        });
    });
  }

  ngOnInit() {
  }

  deleteSession(id) {
    this.sessionService.deleteSession(id)
      .subscribe(data => {
        this.dataSession.splice(this.dataSession.indexOf(id), 1);
      });
  }

  deleteParticipant(id) {
    this.participantService.deleteParticipant(id)
      .subscribe(data => {
        this.dataParticipant.splice(this.dataParticipant.indexOf(id), 1);
      });
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id)
      .subscribe(data => {
        this.dataEvent.splice(this.dataEvent.indexOf(id), 1);
      });
  }

  deletePhoto(id) {
    this.photosService.deletePhoto(id)
      .subscribe(data => this.router.navigateByUrl('/photos'));
  }

}
