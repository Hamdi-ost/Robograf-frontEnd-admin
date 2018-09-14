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

  AccountPermissions = [
    { id: 1, value: 'view-basic-info', selected: false },
    { id: 2, value: 'view-database', selected: false },
    { id: 3, value: 'download-database', selected: false },
    { id: 4, value: 'validate-template', selected: false }
  ];

  account = {
    username: null,
    password: null,
    permissions: null,
    event_id: null,
    author_id: 1
  };

  constructor(private eventService: EventsService, private permissionService: PermissionsService) {
    this.eventService
      .getEvent()
      .toPromise()
      .then(data => {
        if (data.length !== 0) {
          this.account.event_id = data[data.length - 1].id + 1;
        }
      });
  }

  ngOnInit() {
  }

  send() {

    const permissionId = [];
    for (let i = 0; i < this.AccountPermissions.length; i++) {
      if (this.AccountPermissions[i].selected) {
        permissionId.push(this.AccountPermissions[i].id);
      }
      this.account.permissions = permissionId;
    }
    this.accountForm.emit(this.account);
  }


}
