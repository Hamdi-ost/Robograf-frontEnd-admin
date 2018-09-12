import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../../../services/sessions.service';
import { ActivatedRoute } from '@angular/router';
import { MachinesService } from '../../../services/machines.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {


  session = {
    number: null,
    date: null,
    start_time: null,
    end_time: null,
    description: null,
    end_date: null,
    event_id: null
  };

  sessionId;
  machinesDispo = [];
  machines = [];

  constructor(private sessionService: SessionsService,
    private route: ActivatedRoute,
    private machineService: MachinesService,
    private flashMessages: FlashMessagesService) {
    this.route.params.subscribe(params => {
      this.sessionService.getSessionDetails(params['id'])
        .subscribe(data => {
          this.sessionId = params['id'];
          this.session.start_time = data.sessions[0].start_time;
          this.session.date = data.sessions[0].date;
          this.session.end_date = data.sessions[0].end_date;
          this.session.end_time = data.sessions[0].end_time;
          this.session.description = data.sessions[0].description;
          this.session.event_id = data.sessions[0].event_id;
          this.session.number = data.sessions[0].number;
        });
    });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
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

  update() {

    const req = {
      machines: []
    };

    for (let i = 0; i < this.machinesDispo.length; i++) {
      if (this.machinesDispo[i].selected) {
        req.machines.push({machine_id: this.machines[i].id, session_id: this.sessionId});
      }
    }

    this.sessionService.editSession(this.sessionId, this.session).subscribe();
    this.sessionService.assignMachineAsync(this.sessionId, req).subscribe(null, null, () => {
      this.back();
      this.flashMessages.show('Session updated successfully', { cssClass: 'alert-success', timeout: 3000 });
    });

  }



}
