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
    permissions: null,
    event_id: null,
    author_id: 1
  };

  session = {
    number: null,
    date: null,
    start_time: null,
    end_time: null,
    description: null,
    end_date: null,
    event_id: null
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
    entreprise_id: null,
    event_id: null
  };

  req;
  sessionId;

  constructor(
    private eventService: EventsService,
    private companiesService: CompaniesService,
    private representantService: RepresentantsService,
    private sessionService: SessionsService,
    private accountService: AccountsService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private sessionSerive: SessionsService) {
    this.fetchData();
  }

  fetchData() {
    this.sessionSerive.getSessions().subscribe(data => this.sessionId = data[data.length - 1].id + 1);
    this.eventService.getEvent().subscribe(data => this.eventId = data[data.length - 1].id + 1);
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
    this.representant.event_id = this.eventId;

  }

  eventSubmit(event) {
    this.event = event;
    this.event.author_id = 1;
  }

  accountSubmit(account) {
    this.account.username = account.username;
    this.account.password = account.password;
    this.account.event_id = account.event_id;
    this.account.permissions = account.permissions;
  }

  sessionSubmit(session) {
    this.session.number = 1;
    this.session.date = session.date;
    this.session.end_date = session.end_date;
    this.session.start_time = session.start_time;
    this.session.end_time = session.end_time;
    this.session.description = session.description;
    this.session.event_id = this.eventId;


    for (let i = 0; i < session.req.machines.length; i++) {
      session.req.machines[i].session_id = this.sessionId;
    }
    this.req = session.req;
  }

  add() {


    // event
    this.eventService.addEvent(this.event).subscribe(null, null, () => {
      this.sessionService.addSession(this.session).subscribe(null, null, () => {
        this.sessionService.assignMachineAsync(this.sessionId, this.req).subscribe();
      });
           if (this.company.name != null) {
        this.companiesService.addCompany(this.company)
          .subscribe(null, null, () => this.representantService
            .addRepresentant(this.representant)
            .subscribe());
      } else {
        // representant + company (exist)
        this.representantService.addRepresentant(this.representant).subscribe();
      }
      this.accountService.addAccount(this.account).subscribe();
    });

    this.router.navigateByUrl('/events');
    this.fetchData();
    this.flashMessages.show('Event Added', { cssClass: 'alert-success', timeout: 3000 });
  }

}
