import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { RepresentantsService } from '../../../services/representants.service';
import { AccountsService } from '../../../services/accounts.service';
import { SessionsService } from '../../../services/sessions.service';
import { Event } from '../../../models/event';
import { UsersService } from '../../../services/users.service';
import { Session } from '../../../models/session';
import { Account } from '../../../models/account';
import { CompaniesService } from '../../../services/companies.service';
import { Representant } from '../../../models/representant';


@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  title = 'sessions';
  titleForListDetails = 'events';
  titleForRepresentant = 'representants';
  titleForAccount = 'accounts';
  createLinkEvent = '/createEvent';
  createLinkRepresentant = '/createRepresentant';
  createLinkAccount = '/createAccount';
  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitlesS = ['Number', 'Start Data', 'Start Time', 'End Time', 'End Date', 'Description', 'Event'];
  colTitlesR = ['First Name', 'Last Name', 'Email', 'Phone', 'Company'];
  colTitlesA = ['Username', 'Link', 'Author', 'Event', 'Permissions'];
  repLength;
  dataSessions = [];
  dataRepresentants = [];
  dataAccounts = [];
  keySessions: any[];
  keyRepresentatnts: any[];
  keyAccounts: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Remaining sessions', 'Next session', 'Photos', 'Participants', 'Templates'];
  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['fa fa-tags', 'fa fa-map-marker', 'fa fa-building', 'fa fa-envelope', 'fa fa-pencil', 'fa fa-pencil'];

  constructor(
    private router: Router,
    private eventService: EventsService,
    private representantsService: RepresentantsService,
    private accountService: AccountsService,
    private companiesService: CompaniesService,
    private sessionService: SessionsService,
    private usersService: UsersService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventService.getEventDetails(params['id'])
        .subscribe(data => {
          this.usersService.getUsers().subscribe(user => {
            this.companiesService.getCompany().subscribe(company => {
              const companies = company;
              const users = user;
              // list
              this.dataList = Event.map(data.events, users);
              this.dataListKeys = Object.keys(this.dataList[0]);
              // cubes
              this.cubesData.push(data.remaining_sessions_count, data.nextSession, data.photos_count, data.participants_count);
              // tables
                // Sessions
                this.dataSessions = Session.map(data.sessions, data.events);
                if (this.dataSessions.length > 0) {
                  this.keySessions = Object.keys(this.dataSessions[0]);
                }
                // Representatnts
                this.dataRepresentants = Representant.map(data.representants, companies);
                if (this.dataRepresentants.length > 0) {
                  this.keyRepresentatnts = Object.keys(this.dataRepresentants[0]);
                }
                // Accounts
                this.dataAccounts = Account.map(data.accounts, data.events, users);
                if (this.dataAccounts.length > 0) {
                  this.keyAccounts = Object.keys(this.dataAccounts[0]);
                }
            });
          });
        });
    });
  }

  ngOnInit() {
  }

  deleteSession(id) {
    this.sessionService.deleteSession(id)
      .subscribe(data => {
        this.dataSessions.splice(this.dataSessions.indexOf(id), 1);
      });
  }

  deleteRepresentant(id) {
    this.representantsService.deleteRepresentant(id)
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

  deleteEvent(id) {
    this.eventService.deleteEvent(id)
      .subscribe(data => this.router.navigateByUrl('/events'));
  }

}
