import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RepresentantsService } from '../../../services/representants.service';
import { AccountsService } from '../../../services/accounts.service';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company';
import { Event } from '../../../models/event';
import { Representant } from '../../../models/representant';
import { UsersService } from '../../../services/users.service';
import { Account } from '../../../models/account';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  title = 'companies';
  titleForEditRepresentant = 'representants';
  titleForEditEvent = 'events';
  titleForEditAccount = 'accounts';
  createLink = 'createRepresentant';
  // stat variables
  stat = ['Total Companies', 'Total Contact', 'Total Account'];
  titleStat = ['companies', 'representants', 'accounts'];
  valStat = [1, 2, 3];
  icon = ['fa fa-building', 'fa fa-male', 'fa fa-sign-in'];
  // table variables
  colTitlesR = ['First Name', 'Last Name', 'Email', 'Phone', 'Company'];
  colTitlesE = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  colTitlesA = ['Username', 'Link', 'Event', 'Author', 'Permissions'];
  repLength;
  dataEvents = [];
  dataRepresentants = [];
  dataAccounts = [];
  keyEvents: any[];
  keyRepresentatnts: any[];
  keyAccounts: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Contacts', 'Next Session', 'Futur Sessions', 'Past Sessions'];
  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['fa fa-tag', 'fa fa-building', 'fa fa-flash'];
  constructor(
    private router: Router,
    private eventService: EventsService,
    private representantService: RepresentantsService,
    private accountService: AccountsService,
    private companiesService: CompaniesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private eventsService: EventsService) {
    this.route.params.subscribe(params => {
      this.companiesService.getCompanyDetails(params['id'])
        .subscribe(data => {
          this.usersService.getUsers().subscribe(user => {
            const users = user;
            // list
            this.dataList = Company.map(data.entreprises);
            this.dataListKeys = Object.keys(this.dataList[0]);
            // cubes
            this.cubesData.push(data.representants.length, data.next_session, data.future_sessions_count, data.past_sessions_count);
            // tables
            // Events
            this.dataEvents = Event.map(data.events, users);
            this.keyEvents = Object.keys(this.dataEvents[0]);
            // Representatnts
            this.dataRepresentants = Representant.map(data.representants, data.entreprises);
            this.keyRepresentatnts = Object.keys(this.dataRepresentants[0]);
            // Accounts
            this.dataAccounts = Account.map(data.accounts, data.events, users);
            this.keyAccounts = Object.keys(this.dataAccounts[0]);
          });
        });
    });
  }

  ngOnInit() {
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id)
      .subscribe(data => {
        this.dataEvents.splice(this.dataEvents.indexOf(id), 1);
      });
  }

  deleteRepresentant(id) {
    this.representantService.deleteRepresentant(id)
      .subscribe(data => {
        this.dataRepresentants.splice(this.dataRepresentants.indexOf(id), 1);
      });
  }

  deleteAccount(id) {
    this.accountService.deleteAccount(id)
      .subscribe(data => {
        this.dataAccounts.splice(this.dataAccounts.indexOf(id), 1);
      });
  }

  deleteCompany(id) {
    this.companiesService.deleteCompany(id)
      .subscribe(data => this.router.navigateByUrl('/companies'));
  }

}
