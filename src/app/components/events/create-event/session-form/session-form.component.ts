import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MachinesService } from '../../../../services/machines.service';
import { SessionsService } from '../../../../services/sessions.service';

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
    end_date: null,
    req: null
  };

  machinesDispo = [];
  machines = [];

  constructor(private machineService: MachinesService) {}

  ngOnInit() {
  }


  onChange(newValue) {
    this.machinesDispo = [];
    this.machines = [];
    this.machineService.getAvailableAsync(this.session).subscribe(data => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.machines.push(data[i]);
        this.machinesDispo.push({ id: data[i].id, value: data[i].name, selected: false });
      }
    });
  }

  send() {

    const req = {
      machines: []
    };

    for (let i = 0; i < this.machinesDispo.length; i++) {
      if (this.machinesDispo[i].selected) {
        req.machines.push({ machine_id: this.machines[i].id, session_id: null });
      }
    }

    this.session.req = req;
    this.sessionForm.emit(this.session);
  }
}
