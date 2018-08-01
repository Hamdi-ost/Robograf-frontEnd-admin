import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  title = 'machines';
  stat = ['Desactivated', 'Scheduled Today', 'Available Today', 'Scheduled Tomorrow'];
  titleStat = ['machines', 'machines', 'machines', 'machines'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-power-off', 'fa fa-calendar-check-o', 'fa fa-check', 'fa fa-calendar'];
  colTitles = ['Name', 'Type', 'Status'];
  data: any[];
  keys: any[];
  createLink = '/createMachine';

  constructor(private machineService: MachinesService , private route: ActivatedRoute, private flashMessageService: FlashMessagesService) {
    this.machineService.getMachines()
    .subscribe(data => {
      this.data = data.reverse();
      this.keys = Object.keys(this.data[0]);
    });


  }

  ngOnInit() {
  }

  deleteMachine (id) {
    this.machineService.deleteMachine(id)
    .subscribe(data => {
        this.flashMessageService.show('Machine deleted', { cssClass: 'alert-success', timeout: 3000 });
        this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
    });
  }

  activateMachine (id) {
    this.machineService.activateMachine(id)
    .subscribe(data => {
      this.flashMessageService.show('Machine activated', { cssClass: 'alert-success', timeout: 3000 });
      this.data.find(machine => machine.id === id).active = 1;
    });
  }

  desactivateMachine (id) {
    this.machineService.desactivateMachine(id)
    .subscribe(data => {
      this.flashMessageService.show('Machine Desactivated', { cssClass: 'alert-danger', timeout: 3000 });
      this.data.find(machine => machine.id === id).active = 0;
    });
  }


}
