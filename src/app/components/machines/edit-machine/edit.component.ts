import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './editMachine.component.html'
})
export class EditMachineComponent implements OnInit {
  name :string;
  type :string;

  constructor(private machineService: MachinesService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.machineService.getMachineDetails(params['id'])
      .subscribe(data => {
        this.name=data.machines.name;
        this.type=data.machines.type;
      })
   })
  }

  ngOnInit() {
  }

  back(){
    window.history.back();
  }

}
