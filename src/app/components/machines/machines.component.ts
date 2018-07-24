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
      this.data = data;
      this.keys = Object.keys(this.data[0]);
      // Statics Values
      let desactivated = 0;
      let availableToday = 0;
      let scheduledToday = 0;
      let scheduledTomorrow = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].active === 0) {
        desactivated++;
        }
        machineService.getMachineDetails(i + 1)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(data => {
              const today = new Date();
              const tomorrow =  new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
              // tslint:disable-next-line:max-line-length
              const tempdateAvaib = new Date (data.next_available_date.split('-')[0], data.next_available_date.split('-')[1] - 1, data.next_available_date.split('-')[2]);
              if (tempdateAvaib.getTime() === today.getTime()) {
              availableToday++;
              }
              for (let j = 0; j < data.sessions.length; j++) {
                // tslint:disable-next-line:max-line-length
                if (new Date (data.sessions[j].date.split('-')[0], data.sessions[j].date.split('-')[1] - 1, data.sessions[j].date.split('-')[2]).getTime() === today.getTime()) {
                  scheduledToday++;
                }
                // tslint:disable-next-line:max-line-length
                if (new Date (data.sessions[j].date.split('-')[0], data.sessions[j].date.split('-')[1] - 1, data.sessions[j].date.split('-')[2]).getTime() === tomorrow.getTime()) {
                  scheduledTomorrow++;
                }
              }
              this.valStat[0] = desactivated;
              this.valStat[1] = scheduledToday;
              this.valStat[2] = availableToday;
              this.valStat[3] = scheduledTomorrow;
          });
      }

    });


  }

  ngOnInit() {
  }

  deleteMachine (id) {
    this.machineService.deleteMachine(id)
    .subscribe(data => {
        this.flashMessageService.show('Machine deleted', { cssClass: 'alert-success', timeout: 3000 });
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

  activateMachine (id) {
    this.machineService.activateMachine(id)
    .subscribe(data => {
      console.log(data);
      this.flashMessageService.show('Machine activated', { cssClass: 'alert-success', timeout: 3000 });
      this.data.find(machine => machine.id === id).active = 1;
    });
  }

  desactivateMachine (id) {
    this.machineService.desactivateMachine(id)
    .subscribe(data => {
      console.log(data);
      this.flashMessageService.show('Machine Desactivated', { cssClass: 'alert-danger', timeout: 3000 });
      this.data.find(machine => machine.id === id).active = 0;
    });
  }


}
