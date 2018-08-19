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
  AccountPermissions;
  event_id;
  events;
  permissions;

  constructor(
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
    private eventService: EventsService,
    private accountsServie: AccountsService,
    private permissionService: PermissionsService) {
    this.permissionService.getPermissions().subscribe(data => this.permissions = data);
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

    // Fill the object
    const account = {
      username: this.username,
      password: this.password,
      permissions: null,
      event_id: Number(this.event_id),
      author_id: 1
    };

    // Required  Fields
    if (!this.validateService.validateAccountRegister(account)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    console.log(account);

    // Add user
    this.accountsServie.addAccount(account)
      .subscribe(data => {
        this.back();
        this.flashMessages.show('Account Added', { cssClass: 'alert-success', timeout: 3000 });
      });

  }

}
