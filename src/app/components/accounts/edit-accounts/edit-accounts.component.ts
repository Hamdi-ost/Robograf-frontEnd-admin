import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../models/account';
import { AccountsService } from '../../../services/accounts.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.css']
})
export class EditAccountsComponent implements OnInit {

  id;
  username;
  password;
  link;
  name;
  event_id;
  modifiedAccount: Account = new Account();
  AccountPermissions = [
    { id: 1, value: 'view-basic-info', selected: false },
    { id: 2, value: 'view-database', selected: false },
    { id: 3, value: 'download-database', selected: false },
    { id: 4, value: 'validate-template', selected: false }
  ];
  events;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private eventService: EventsService) {
    this.eventService
      .getEvent()
      .toPromise()
      .then(data => {
        this.events = data;
      });
    this.route.params.subscribe(params => {
      this.accountsService.getAccountDetails(params['id'])
        .subscribe(data => {
          this.username = data.accounts[0].username;
          this.password = data.accounts[0].password;
        }, null, this.id = params['id']
        );
    });
    this.accountsService.getLinkToRefresh(this.id).subscribe(data => {
      this.name = data['link'];
    });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  Update() {

    const permissionId = [];

    for (let i = 0 ; i < this.AccountPermissions.length ; i++) {
        if (this.AccountPermissions[i].selected) {
          permissionId.push(this.AccountPermissions[i].id);
        }
    }

    // Set the new account
    this.modifiedAccount.password = this.password;
    this.modifiedAccount.username = this.username;
    this.modifiedAccount.link = this.link;
    this.modifiedAccount.permissions = permissionId;
    this.modifiedAccount.event = this.event_id;

    // Required  Fields
    if (!this.validateService.validateAccountRegister(this.modifiedAccount)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }


    // tslint:disable-next-line:no-shadowed-variable
    this.route.params.subscribe(params => {
      this.accountsService.editAccount(params['id'], this.modifiedAccount)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('Account updated successfully', { cssClass: 'alert-success', timeout: 3000 });
        });
    });
  }
  refreshLink() {
    this.accountsService.getLinkToRefresh(this.id).subscribe(data => {
      this.name = data['link'];
    });
  }


}
