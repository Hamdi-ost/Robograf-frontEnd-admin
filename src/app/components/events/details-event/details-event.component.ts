import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { ParticipantsService } from '../../../services/participants.service';
import { PhotosService } from '../../../services/photos.service';
import { StaticService } from '../../../services/static.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MachinesService } from '../../../services/machines.service';


@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent {
  @Output() sendEventId = new EventEmitter();
  machinesDispo = [];
  machines = [];
  title = 'sessions';
  titleForListDetails = 'events';
  titleForRepresentant = 'representants';
  createLinkSession = '/createSessions';
  titleForAccount = 'accounts';
  createLinkEvent = '/createEvent';
  createLinkRepresentant = '/createRepresentant';
  createLinkAccount = '/createAccount';
  // stat variables
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  // table variables
  colTitlesS = ['Number', 'Start Data', 'Start Time', 'End Time', 'End Date', 'Description', 'Event'];
  colTitlesR = ['First Name', 'Last Name', 'Email', 'Phone', 'Company'];
  colTitlesA = ['', 'Username', 'Link', 'Author', 'Event'];
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

  event_id;
  event_name;
  author;
  companies;

  AccountPermissions = [
    { id: 1, value: 'view-basic-info', selected: false },
    { id: 2, value: 'view-database', selected: false },
    { id: 3, value: 'download-database', selected: false },
    { id: 4, value: 'validate-template', selected: false }
  ];
  session = {
    number: null,
    date: null,
    start_time: null,
    end_time: null,
    description: null,
    end_date: null,
    event_id: null
  };
  representant = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    entreprise_id: null,
    company: null
  };

  account = {
    username: null,
    password: null,
    event: null,
    author: null
  };
  sessionId;
  constructor(
    private router: Router,
    private flashMessages: FlashMessagesService,
    private eventService: EventsService,
    private representantsService: RepresentantsService,
    private sessionSerive: SessionsService,
    private accountService: AccountsService,
    private companiesService: CompaniesService,
    private sessionService: SessionsService,
    private usersService: UsersService,
    private staticService: StaticService,
    private route: ActivatedRoute,
    private machineService: MachinesService) {
    this.companiesService.getCompany().subscribe(data => this.companies = data);
    this.fetchData();

  }

  fetchData() {
    // stat
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
    this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);
    this.sessionSerive.getSessions().subscribe(data => {
      if (data.length !== 0) {
        this.sessionId = data[data.length - 1].id + 1;
      }
    });
    this.route.params.subscribe(params => {
      this.eventService.getEventDetails(params['id'])
        .subscribe(data => {
          this.event_id = params['id'];
          this.usersService.getUsers().subscribe(user => {
            this.companiesService.getCompany().subscribe(company => {
              const companies = company;
              const users = user;
              // list
              this.dataList = Event.map(data.events, users);
              this.author = this.dataList[0].author;
              this.event_name = this.dataList[0].name;
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


  addRepresentant() {

    const contact = {
      first_name: this.representant.firstName,
      last_name: this.representant.lastName,
      email: this.representant.email,
      phone: this.representant.phone,
      entreprise_id: this.representant.entreprise_id,
      event_id: this.event_id
    };

    // get company name
    this.companiesService.getCompanyDetails(this.representant.entreprise_id)
      .toPromise()
      .then(data => {
        this.representant.company = data.entreprises[0].name;
      });
    // Add representant
    this.representantsService.addRepresentant(contact)
      .subscribe(res => {
        this.fetchData();
        this.dataRepresentants.push(this.representant);
        this.flashMessages.show('Representant added', { cssClass: 'alert-success', timeout: 3000 });
      });
  }

  detachRepresentant(RepresentantId) {
    this.eventService.detachRepresentant(this.event_id, RepresentantId).subscribe(res => this.fetchData());
  }

  addAccount() {

    const permissionId = [];

    for (let i = 0; i < this.AccountPermissions.length; i++) {
      if (this.AccountPermissions[i].selected) {
        permissionId.push(this.AccountPermissions[i].id);
      }
    }


    // Fill the object
    const account = {
      username: this.account.username,
      password: this.account.password,
      event_id: this.event_id,
      permissions: permissionId,
      author_id: 1
    };

    this.account.event = this.event_name;
    this.account.author = this.author;
    // Add user
    this.accountService.addAccount(account)
      .subscribe(data => {
        this.fetchData();
        this.dataAccounts.push(this.account);
        this.flashMessages.show('Account Added', { cssClass: 'alert-success', timeout: 3000 });
      });
  }

  addSession() {
    this.session.number = 1;
    this.session.event_id = this.event_id;

    const req = {
      machines: []
    };
    for (let i = 0; i < this.machinesDispo.length; i++) {
      if (this.machinesDispo[i].selected) {
        req.machines.push({ machine_id: this.machines[i].id, session_id: null });
      }
    }

    for (let i = 0; i < req.machines.length; i++) {
      req.machines[i].session_id = this.sessionId;
    }


    this.sessionService.addSession(this.session).subscribe(null, null, () => {
      this.sessionService.assignMachineAsync(this.sessionId, req).subscribe();
      this.fetchData();
    }
    );
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

  onChange(newValue) {
    this.machinesDispo = [];
    this.machines = [];
    this.machineService.getAvailableAsync(this.session).subscribe(data => {
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.machines.push(data[i]);
        this.machinesDispo.push({ id: data[i].id, value: data[i].name, selected: false });
      }
    });
  }

}
