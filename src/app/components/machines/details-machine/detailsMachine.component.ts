import { Component, OnInit, Input } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Machine } from '../../../models/machine';


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
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitles = ['Number', 'Start Date', 'Start Time', 'End Time', 'Description', 'Event', 'End Time'];
  data: any[] = [];
  keys: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Event', 'Next Session', 'Photos', 'Next Available Date'];
  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['fa fa-gear', 'fa fa-gears', 'fa fa-times-circle'];

  constructor(
    private router: Router,
    private machineService: MachinesService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.machineService.getMachineDetails(params['id'])
        .subscribe(data => {
          // list
          this.dataList = data.machines;
          delete this.dataList ['created_at'];
          delete this.dataList ['deleted_at'];
          delete this.dataList ['updated_at'];
          this.dataListKeys = Object.keys(this.dataList);
          this.dataListKeys.splice(3, 3, 'status');
          // table
          if (data.sessions.length > 0) {
          delete data.sessions [0]['created_at'];
          delete data.sessions [0]['deleted_at'];
          delete data.sessions [0]['updated_at'];
          delete data.sessions [0]['pivot'];
          this.data = data.sessions;
          this.keys = Object.keys(this.data[0]);
          }
          // cubes
          this.cubesData.push(data.events_count, data.nextSession, data.photos_count, data.next_available_date);
        });
      });
    }

  ngOnInit() {

  }

  deleteMachine (id) {
    this.machineService.deleteMachine(id)
    .subscribe(data => this.router.navigateByUrl('/machines'));
  }

}
