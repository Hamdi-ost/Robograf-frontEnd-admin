import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipantsService } from '../../../services/participants.service';
import { Participant } from '../../../models/participant';
import { EventsService } from '../../../services/events.service';
import { Photo } from '../../../models/photo';
import { MachinesService } from '../../../services/machines.service';
import { SessionsService } from '../../../services/sessions.service';
import { PhotosService } from '../../../services/photos.service';

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
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitlesPhotos = ['Url', 'Photo Time', 'Machine', 'Event', 'Session', 'Participant'];
  dataPhoto = [];
  keysPhoto: any[];
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
    private photosService: PhotosService,
    private eventsService: EventsService,
    private participantsService: ParticipantsService,
    private machinesService: MachinesService,
    private sessionsService: SessionsService,
    private route: ActivatedRoute) {
    let machines, sessions;
    this.sessionsService.getSessions().subscribe(data => sessions = data);
    this.machinesService.getMachines().subscribe(data => machines = data);
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
            this.dataPhoto = Photo.map(data.photos, machines, sessions.sessions, this.dataList);
            if (this.dataPhoto.length > 0) {
            this.keysPhoto = Object.keys(this.dataPhoto[0]);
            }
          });
        });
    });
  }

  ngOnInit() {
  }

  deletePhoto(id) {
    this.photosService.deletePhoto(id)
      .subscribe(data => {
        this.dataPhoto.splice(this.dataPhoto.indexOf(id), 1);
      });
  }

  deleteParticipant(id) {
    this.participantsService.deleteParticipant(id)
      .subscribe(data => this.router.navigateByUrl('/participants'));
  }
}
