import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Account } from '../../../models/account';
import { Event } from '../../../models/event';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-details-accounts',
  templateUrl: './details-accounts.component.html',
  styleUrls: ['./details-accounts.component.css']
})
export class DetailsAccountsComponent implements OnInit {

  titleForListDetails = 'accounts';
  title1 = 'events';

  // table variables
  // Event
  colTitlesEvent = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  dataEvent: any[] = [];
  keyEvent: any[];

  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['', 'fa fa-user', 'fa fa-tag', 'fa fa-user', 'fa fa-calendar'];

  constructor(
    private accountsService: AccountsService,
    private usersService: UsersService,
    private route: ActivatedRoute) {
    let users;
    this.usersService.getUsers().subscribe(data => users = data);
    this.route.params.subscribe(params => {
      this.accountsService.getAccountDetails(params['id'])
        .subscribe(data => {
          // list
          this.dataList = Account.map(data.accounts, data.events, users);
          this.dataListKeys = Object.keys(this.dataList[0]);
          // tables
          // event
          this.dataEvent = Event.map(data.events, users);
          if (this.dataEvent.length > 0) {
            this.keyEvent = Object.keys(this.dataEvent[0]);
          }
        });
    });
  }


  ngOnInit() {
  }

}
