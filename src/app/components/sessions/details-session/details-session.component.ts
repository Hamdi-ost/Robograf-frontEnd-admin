import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsService } from '../../../services/sessions.service';
import { Machine } from '../../../models/machine';
import { MachinesService } from '../../../services/machines.service';
import { Session } from '../../../models/session';
import { EventsService } from '../../../services/events.service';
import { Participant } from '../../../models/participant';
import { Photo } from '../../../models/photo';
import { PhotosService } from '../../../services/photos.service';
import { ParticipantsService } from '../../../services/participants.service';
import { map } from 'rxjs/operators';
import { StaticService } from '../../../services/static.service';

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
  sessionId;
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
  machineId;
  machines = [];
  constructor(
    private sessionService: SessionsService,
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private photosService: PhotosService,
    private participantsService: ParticipantsService,
    private machineService: MachinesService,
    private staticService: StaticService) {

    this.machineService.getMachines()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          const obj = { id: data[i].id, value: data[i].name, selected: false };
          this.machines.push(obj);
        }
      });
    this.fetchData();
  }

  ngOnInit() {
  }

  fetchData() {

    // stat
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
    this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);

    this.route.params.subscribe(params => {
      this.sessionService.getSessionDetails(params['id'])
        .subscribe(data => {
          this.eventsService.getEvent().subscribe(event => {
            const events = event;
            // list
            this.dataList = Session.map(data.sessions, events);
            this.dataList.splice(0, 1);
            this.dataList = this.dataList.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.id === this.dataList[index].id
              ))
            );
            if (this.dataList.length !== 0) {
              this.dataListKeys = Object.keys(this.dataList[0]);
            }
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
        }, null, () => {
          this.sessionId = params['id'];
        });
    });
  }

  save() {
    const machineId = [];

    for (let i = 0; i < this.machines.length; i++) {
      if (this.machines[i].selected) {
        machineId.push(this.machines[i].id);
      }
    }

    const req = {
      machines: machineId
    };

    this.sessionService.assignMachineAsync(this.sessionId, req).subscribe(data => {
    }, null, () => this.fetchData());
  }

  detachMachine(id) {
    this.sessionService.detachMachineAsync(this.sessionId, id).subscribe(data => {
      this.fetchData();
    });
  }

  deletePhoto(id) {
    this.photosService.deletePhoto(id)
      .subscribe(data => {
        this.fetchData();
      });
  }

  deleteSession(id) {
    this.sessionService.deleteSession(id)
      .subscribe(data => this.router.navigateByUrl('/sessions'));
  }

  deleteParticipant(id) {
    this.participantsService.deleteParticipant(id)
      .subscribe(data => {
        this.fetchData();
      });
  }

}
