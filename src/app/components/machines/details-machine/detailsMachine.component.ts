import { Component, OnInit, Input } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Machine } from '../../../models/machine';

@Component({
  selector: 'app-detailsMachine',
  templateUrl: './detailsMachine.component.html',
})
export class DetailsMachineComponent implements OnInit {
  
  //stat variables
  stat = ["Total Event", "Total Sessions", "Total Participants", "Total Photos"]
  valStat = [1, 2, 3, 4];
  icon = ["fa fa-list", "fa fa-cubes", "fa fa-users", "fa fa-picture-o"]
  //table variables
  colTitles = ["Number", "Start Date", "Start Time", "End Time", "Description", "Event","End Time"]
  data: any[]=[];
  keys: any[];
  //cubes variables
  cubesData=[];
  //list variables
  dataList;
  dataListKeys;
  dataListIcons=["fa fa-gear","fa fa-gears","fa fa-times-circle"]

  constructor(
    private machineService: MachinesService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
        this.machineService.getMachineDetails(params['id'])
        .subscribe(data => {
          //list
          this.dataList= data.machines
          delete this.dataList ['created_at']
          delete this.dataList ['deleted_at']
          delete this.dataList ['id']
          delete this.dataList ['updated_at']
          this.dataListKeys=Object.keys(this.dataList)
          this.dataListKeys.splice(2,2,'status')
          //table
          if(data.sessions.length>0){
          delete data.sessions [0]['created_at']
          delete data.sessions [0]['deleted_at']
          delete data.sessions[0]['id']
          delete data.sessions [0]['updated_at']
          delete data.sessions [0]['pivot']
          this.data=data.sessions
          this.keys=Object.keys(this.data[0]);
          }
          //cubes
          this.cubesData.push(data.events_count,data.nextSession,data.photos_count,data.next_available_date)
        })
      })
    }

  ngOnInit() {
  
  }

}
