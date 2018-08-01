import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { CompaniesService } from '../../../services/companies.service';
import { RepresentantsService } from '../../../services/representants.service';
import { SessionsService } from '../../../services/sessions.service';
import { AccountsService } from '../../../services/accounts.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  index = 0;
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];

  event;

  account = {
    username: null,
    password: null,
    event_id: null,
    author_id: 1
  };

  company = {
    name: null,
    matricule: null,
    activity: null,
  };

  representant = {
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    entreprise_id: null
  };


  constructor(
    private eventService: EventsService,
    private companiesService: CompaniesService,
    private representantService: RepresentantsService,
    private sessionService: SessionsService,
    private accountService: AccountsService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  increment() {
    this.index++;
  }

  decrement() {
    this.index--;
  }

  newRepresentantFormSubmit(newRepresentant) {

    this.company.name = newRepresentant.name;
    this.company.matricule = newRepresentant.matricule;
    this.company.activity = newRepresentant.activity;

    this.representant.first_name = newRepresentant.first_name;
    this.representant.last_name = newRepresentant.last_name;
    this.representant.email = newRepresentant.email;
    this.representant.phone = newRepresentant.phone;
    this.representant.entreprise_id = newRepresentant.entreprise_id;

    console.log(this.company);
    console.log(this.representant);
  }

  eventSubmit(event) {
    this.event = event;
    this.event.author_id = 1;
    console.log(this.event);
  }

  accountSubmit(account) {
    this.account.username = account.username;
    this.account.password = account.password;
    this.account.event_id = account.event_id;
    console.log(this.account);
  }

  add() {
    // event
    this.eventService.addEvent(this.event);
    // representant + company (new)
    this.companiesService.addCompany(this.company)
      .subscribe(null, null, () => this.representantService
        .addRepresentant(this.representant)
        .subscribe());
    // session
    // account
    this.accountService.addAccount(this.account);
    this.router.navigateByUrl('/events');
    this.flashMessages.show('Event Added', { cssClass: 'alert-success', timeout: 3000 });
  }

}
