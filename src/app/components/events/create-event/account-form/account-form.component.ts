import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventsService } from '../../../../services/events.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  @Output() accountForm: EventEmitter<any> = new EventEmitter<any>();

  account = {
    username: null,
    password: null,
    event_id: null
  };

  constructor(private eventService: EventsService) {
    this.eventService
    .getEvent()
    .toPromise()
    .then(data => {
      this.account.event_id = data[data.length - 1].id + 1;
    });
  }

  ngOnInit() {
  }

  send() {
    this.accountForm.emit(this.account);
  }


}
