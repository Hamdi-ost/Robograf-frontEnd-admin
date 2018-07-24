import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from '../../../models/machine';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './editMachine.component.html'
})
export class EditMachineComponent implements OnInit {
  name: string;
  type: string;
  active;
  modifiedMachine: Machine = new Machine();

  constructor(private machineService: MachinesService,
    private route: ActivatedRoute,
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService) {
    this.route.params.subscribe(params => {
      this.machineService.getMachineDetails(params['id'])
        .subscribe(data => {
          this.name = data.machines[0].name;
          this.type = data.machines[0].type;
          this.active = data.machines[0].active;
         console.log(this.active);
        });
    });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }


  Update() {
    this.modifiedMachine.name = this.name;
    this.modifiedMachine.type = this.type;

     // Required  Fields
     if (!this.validateService.validateRegister(this.modifiedMachine)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.route.params.subscribe(params => {
      this.machineService.editMachine(params['id'], this.modifiedMachine)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('Machine updated successfully', { cssClass: 'alert-success', timeout: 3000 });
      });
    });
  }
}
