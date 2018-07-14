import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { Machine } from '../../models/machine';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  
  title="machines"
  stat=["Desactivated","Scheduled Today","Available Today","Scheduled Tomorrow"]
  valStat=[1,2,3,4];
  icon = ["fa fa-power-off","fa fa-calendar-check-o","fa fa-chack","fa fa-calendar"]
  colTitles=["ID","Name","Type","Status"]
  data:any[];
  keys:any[];
  createLink="/createMachine"
  
  constructor(private machineService: MachinesService) { 
    this.machineService.getMachines()
    .subscribe(data=>
      {
      this.data=data;
      this.keys=Object.keys(this.data[0]);
    })
  }

  ngOnInit() {
  }

}
