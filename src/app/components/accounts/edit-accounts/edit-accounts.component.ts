import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../../models/account';
import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-edit-accounts',
  templateUrl: './edit-accounts.component.html',
  styleUrls: ['./edit-accounts.component.css']
})
export class EditAccountsComponent implements OnInit {

  username;
  password;
  modifiedAccount: Account = new Account();


  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private accountsService: AccountsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.accountsService.getAccountDetails(params['id'])
        .subscribe(data => {
          this.username = data.accounts[0].username;
          this.password = data.accounts[0].password;
        });
    });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  Update() {
    // Set the new account
    this.modifiedAccount.password = this.password;
    this.modifiedAccount.username = this.username;

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

}
