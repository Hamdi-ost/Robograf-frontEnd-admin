import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../../services/sessions.service';
import { Machine } from '../../../models/machine';

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.component.html',
  styleUrls: ['./details-session.component.css']
})
export class DetailsSessionComponent implements OnInit {
  titleForListDetails = 'sessions';
  title1 = 'machines';
  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
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
  colTitlesPhotos = ['Url', 'Photo Time', 'Machine', 'Event', 'Session', 'Participant'];
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
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.sessionService.getSessionDetails(params['id'])
        .subscribe(data => {
          // list
          this.dataList = data.sessions[0];
          delete this.dataList ['description'];
          delete this.dataList ['event_id'];
          delete this.dataList ['created_at'];
          delete this.dataList ['deleted_at'];
          delete this.dataList ['photos'];
          delete this.dataList ['machines'];
          delete this.dataList ['updated_at'];
          this.dataList.event = data.sessions[0].event.name;
          this.dataListKeys = Object.keys(this.dataList);
          // cubes
          this.cubesData.push(data.remaining_sessions_count, data.nextSession, data.photos_count, data.participants_count);
          // tables
           // machines
             this.dataMachines = data.machines;
             this.keysMachines = Object.keys(this.dataMachines[0]);
           // Participants
             this.dataParticipants = data.participants;
             this.keysParticipants = Object.keys(this.dataParticipants[0]);
           // Photos
             this.dataPhotos = data.photos;
             this.keysPhotos = Object.keys(this.dataPhotos[0]);
        });
      });
    }

  ngOnInit() {
  }

}