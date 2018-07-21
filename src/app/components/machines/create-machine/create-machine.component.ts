import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MachinesService } from '../../../services/machines.service';
import { ValidateService } from '../../../services/validate.service';
import { Machine } from '../../../models/machine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {
  name: string;
  type: string;
  active = 1;
  machine: Machine = new Machine();

  constructor(
    private flashMessages: FlashMessagesService,
    private machineService: MachinesService,
    private validateService: ValidateService,
    private router: Router) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.machine.name = this.name;
    this.machine.type = this.type;
    this.machine.active = this.active;

    // Required  Fields
    if (!this.validateService.validateRegister(this.machine)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add machine
    this.machineService.addMachine(this.machine)
    .subscribe(data => {
      this.router.navigateByUrl('/machines');
      this.flashMessages.show('Machine created !!', { cssClass: 'alert-success', timeout: 3000 });
    });



  }
}
