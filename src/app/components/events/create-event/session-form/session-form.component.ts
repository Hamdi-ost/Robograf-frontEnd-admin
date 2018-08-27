import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MachinesService } from '../../../../services/machines.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit {
  @Output() sessionForm: EventEmitter<any> = new EventEmitter<any>();

  session = {
    date: null,
    start_time: null,
    end_time: null,
    description: null,
    end_date: null
  };

  machinesDispo = [];

  constructor(private machineService: MachinesService) {
   }

  ngOnInit() {
  }

  onChange(newValue) {
    this.machineService.getAvailableAsync(this.session).subscribe(data => {
      for (let i = 0; i < Object.keys(data).length ; i++ ) {
          this.machinesDispo.push({value: data[i], selected: false}) ;
        }
    console.log(this.machinesDispo);
    });
  }

  send() {
    this.sessionForm.emit(this.session);
  }
}
