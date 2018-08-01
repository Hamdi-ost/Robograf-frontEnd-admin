import { Component, OnInit, Input } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Machine } from '../../../models/machine';
import { Session } from '../../../models/session';
import { EventsService } from '../../../services/events.service';
import { StaticService } from '../../../services/static.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-detailsMachine',
  templateUrl: './detailsMachine.component.html',
})
export class DetailsMachineComponent implements OnInit {
  title = 'machines';
  titleForEditSession = 'sessions';
  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitles = ['Number', 'Start Data', 'Start Time', 'End Time', 'End Date', 'Description', 'Event'];
  data = [];
  keys: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Event', 'Next Session', 'Photos', 'Next Available Date'];
  // list variables
  dataList = [];
  dataListKeys = [];
  dataListIcons = ['fa fa-gear', 'fa fa-gears', 'fa fa-times-circle'];

  constructor(
    private router: Router,
    private machineService: MachinesService,
    private eventsServie: EventsService,
    private route: ActivatedRoute,
    private staticService: StaticService) {
          // stat
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
    this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);

    this.route.params.subscribe(params => {
      this.eventsServie.getEvent().subscribe(event => {
        const events = event;
        this.machineService.getMachineDetails(params['id'])
          .subscribe(data => {
            // list
            this.dataList = Machine.map(data.machines);
            this.dataListKeys = Object.keys(this.dataList[0]);
            this.dataListKeys.splice(3, 3, 'status');
            // table
            this.data = Session.map(data.sessions, events);
            if (this.data.length > 0) {
            this.keys = Object.keys(this.data[0]);
            }
            // cubes
            this.cubesData.push(data.events_count, data.nextSession, data.photos_count, data.next_available_date);
          });
      });
    });
  }

  ngOnInit() {

  }

  deleteMachine(id) {
    this.machineService.deleteMachine(id)
      .subscribe(data => this.router.navigateByUrl('/machines'));
  }

}
