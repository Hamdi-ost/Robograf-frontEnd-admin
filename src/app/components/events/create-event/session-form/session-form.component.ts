import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit {
  @Output() sessionForm: EventEmitter<any> = new EventEmitter<any>();

  session = {
    // number: null,
    date: null,
    start_time: null,
    end_time: null,
    description: null,
    // event_id: null,
    end_date: null
  };

  constructor() { }

  ngOnInit() {
  }
  // getAvailableAsync

  send() {
    this.sessionForm.emit(this.session);
  }
}
