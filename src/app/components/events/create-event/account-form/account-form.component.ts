import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventsService } from '../../../../services/events.service';
import { PermissionsService } from '../../../../services/permissions.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  @Output() accountForm: EventEmitter<any> = new EventEmitter<any>();

  permissions;

  account = {
    username: null,
    password: null,
    permissions: null,
    event_id: null,
    author_id: 1
  };

  constructor(private eventService: EventsService, private permissionService: PermissionsService) {
    this.permissionService.getPermissions().subscribe(data => this.permissions = data);
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
