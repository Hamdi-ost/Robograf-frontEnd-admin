import { Component } from '@angular/core';
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
import { StaticService } from '../../../services/static.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent  {

  title = 'companies';
  titleForEditRepresentant = 'representants';
  titleForEditEvent = 'events';
  titleForEditAccount = 'accounts';
  createLink = '/createRepresentant';
  // stat variables
  stat = ['Total Companies', 'Total Contact', 'Total Account'];
  titleStat = ['companies', 'representants', 'accounts'];
  valStat = [1, 2, 3];
  icon = ['fa fa-building', 'fa fa-male', 'fa fa-sign-in'];
  // table variables
  colTitlesR = ['First Name', 'Last Name', 'Email', 'Phone', 'Company'];
  colTitlesE = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  colTitlesA = ['', 'Username', 'Link', 'Author', 'Event'];
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

  entreprise_id;
  entreprise_name;

  representant = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    company: null
  };

  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private eventService: EventsService,
    private representantService: RepresentantsService,
    private accountService: AccountsService,
    private companiesService: CompaniesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private staticService: StaticService) {
      this.fetchData();
    }

    fetchData() {

        // stat
        this.staticService.getTotalCompany().then(total => this.valStat[0] = total);
        this.staticService.getTotalRepresentant().then(total => this.valStat[1] = total);
        this.staticService.getTotalAccount().then(total => this.valStat[2] = total);

        this.route.params.subscribe(params => {
          this.companiesService.getCompanyDetails(params['id'])
            .toPromise()
            .then(data => {
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
                if (this.dataEvents.length > 0) {
                this.keyEvents = Object.keys(this.dataEvents[0]);
                }
                // Representatnts
                this.dataRepresentants = Representant.map(data.representants, data.entreprises);
                if (this.dataRepresentants.length > 0) {
                this.keyRepresentatnts = Object.keys(this.dataRepresentants[0]);
                }
                // Accounts
                this.dataAccounts = Account.map(data.accounts, data.events, users);
                if (this.dataAccounts.length > 0) {
                this.keyAccounts = Object.keys(this.dataAccounts[0]);
                }
              });
              this.entreprise_id = params['id'];
              this.entreprise_name = data.entreprises[0].name;
            });
          });
  }

  OnSubmit() {

    const contact = {
      first_name : this.representant.firstName,
      last_name : this.representant.lastName,
      email : this.representant.email,
      phone: this.representant.phone,
      entreprise_id: this.entreprise_id
    };

    this.representant.company = this.entreprise_name;

    // Add representant
    this.representantService.addRepresentant(contact)
    .subscribe(res => {
      this.flashMessages.show('Representant added', { cssClass: 'alert-success', timeout: 3000 });
      this.fetchData();
    });
  }


  deleteEvent(id) {
    this.eventService.deleteEvent(id)
      .subscribe(data => {
       this.fetchData();
      });
  }

  deleteRepresentant(id) {
    this.representantService.deleteRepresentant(id)
      .toPromise()
      .then(data => {
        this.fetchData();
      });
  }

  deleteAccount(id) {
    this.accountService.deleteAccount(id)
      .subscribe(data => {
        this.fetchData();
      });
  }

  deleteCompany(id) {
    this.companiesService.deleteCompany(id)
      .subscribe(data => this.router.navigateByUrl('/companies'));
  }

}
