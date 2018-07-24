import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';
import { Router } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account';

@Component({
  selector: 'app-create-accounts',
  templateUrl: './create-accounts.component.html',
  styleUrls: ['./create-accounts.component.css']
})
export class CreateAccountsComponent implements OnInit {

  username;
  password;
  account: Account = new Account();

  constructor(
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router,
    private accountsServie: AccountsService) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.account.username = this.username;
    this.account.password = this.password;

    // Required  Fields
    if (!this.validateService.validateAccountRegister(this.account)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add user
    this.accountsServie.addAccount(this.account)
    .subscribe(data => {
      this.router.navigateByUrl('/accounts');
      this.flashMessages.show('Account Added', { cssClass: 'alert-success', timeout: 3000 });
      });

  }

}
