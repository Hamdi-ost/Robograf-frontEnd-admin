import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  title = 'accounts';
  colTitles = ['Username', 'link', 'Author', 'event'];
  data: any[];
  keys: any[];
  createLink = '/createAccount';

  constructor(private accountsService: AccountsService) {
    this.accountsService.getAccount()
    .subscribe(data => {
      this.data = data;
      this.keys = Object.keys(this.data[0]);
        }
      );
  }

  ngOnInit() {
  }

  deleteAccount (id) {
    this.accountsService.deleteAccount(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

}
