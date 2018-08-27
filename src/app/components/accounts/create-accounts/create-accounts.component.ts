import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account';
import { EventsService } from '../../../services/events.service';
import { PermissionsService } from '../../../services/permissions.service';

@Component({
  selector: 'app-create-accounts',
  templateUrl: './create-accounts.component.html',
  styleUrls: ['./create-accounts.component.css']
})
export class CreateAccountsComponent {

  username;
  password;
  AccountPermissions = [
    {id: 1, value: 'view-basic-info', selected: false},
    {id: 2, value: 'view-database', selected: false},
    {id: 3, value: 'download-database', selected: false},
    {id: 4, value: 'validate-template', selected: false}
  ];
  event_id;
  events;

  constructor(
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
    private eventService: EventsService,
    private accountsServie: AccountsService,
    private permissionService: PermissionsService) {
    this.eventService
      .getEvent()
      .toPromise()
      .then(data => {
        this.events = data;
      });
  }

  back() {
    window.history.back();
  }


  OnSubmit() {

    const permissionId = [];

    for (let i = 0 ; i < this.AccountPermissions.length ; i++) {
        if (this.AccountPermissions[i].selected) {
          permissionId.push(this.AccountPermissions[i].id);
        }
    }
    // Fill the object
    const account = {
      username: this.username,
      password: this.password,
      permissions: permissionId,
      event_id: Number(this.event_id),
      author_id: 1
    };
console.log(account);

    // Required  Fields
    if (!this.validateService.validateAccountRegister(account)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    // Add user
    this.accountsServie.addAccount(account)
      .subscribe(data => {
        this.back();
        this.flashMessages.show('Account Added', { cssClass: 'alert-success', timeout: 3000 });
      });

  }

}
