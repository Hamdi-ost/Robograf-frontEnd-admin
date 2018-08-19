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
  eventId;

  account = {
    username: null,
    password: null,
    event_id: null,
    author_id: 1
  };

  session = {
    number: 2,
    date: null,
    start_time: null,
    end_time: null,
    description: null,
    event_id: null,
    end_date: null
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
  ) {
    this.eventService.getEvent().subscribe(data => this.eventId = data.length);
  }

  increment() {
    this.index++;
  }

  decrement() {
    this.index--;
  }

  ExistRepresentantFormSubmit(existRepresentant) {
    this.representant.first_name = existRepresentant.first_name;
    this.representant.last_name = existRepresentant.last_name;
    this.representant.email = existRepresentant.email;
    this.representant.phone = existRepresentant.phone;
    this.representant.entreprise_id = Number(existRepresentant.entreprise_id);

    console.log(this.representant);
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

  sessionSubmit(session) {
    this.session.date = session.date;
    this.session.end_date = session.end_date;
    this.session.start_time = session.start_time;
    this.session.end_time = session.end_time;
    this.session.description = session.description;
    this.session.event_id = this.eventId;

    console.log(this.session);
  }

  add() {
    console.log(this.company.name);

    // event
    this.eventService.addEvent(this.event).subscribe();
    // representant + company (new)
    if (this.company.name != null) {
    this.companiesService.addCompany(this.company)
      .subscribe(null, null, () => this.representantService
        .addRepresentant(this.representant)
        .subscribe());
    } else {
      // representant + company (exist)
      this.representantService.addRepresentant(this.representant).subscribe();
    }
    // session
    this.sessionService.addSession(this.session).subscribe();
    // account
    this.accountService.addAccount(this.account).subscribe();
    this.router.navigateByUrl('/events');
    this.flashMessages.show('Event Added', { cssClass: 'alert-success', timeout: 3000 });
  }

}
