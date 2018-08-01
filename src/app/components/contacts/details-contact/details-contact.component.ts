import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { CompaniesService } from '../../../services/companies.service';
import { RepresentantsService } from '../../../services/representants.service';
import { Representant } from '../../../models/representant';
import { UsersService } from '../../../services/users.service';
import { Event } from '../../../models/event';
import { Company } from '../../../models/company';
import { StaticService } from '../../../services/static.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.css']
})
export class DetailsContactComponent implements OnInit {
  title = 'representants';
  titleForEditEvent = 'events';
  titleForEditCompany = 'companies';
  // stat variables
  stat = ['Total Companies', 'Total Contact', 'Total Accounts'];
  titleStat = ['companies', 'representants', 'accounts'];
  valStat = [1, 2, 3];
  icon = ['fa fa-building', 'fa fa-male', 'fa fa-sign-in'];
  // table variables
  colTitlesC = ['Matricule', 'Name', 'Activity'];
  colTitlesE = ['Name', 'Subject', 'Location', 'Contact', 'Author'];
  dataEvents = [];
  dataCompanies = [];
  keysEvent: any[];
  keysCompany: any[];
  // cubes variables
  cubesData = [];
  cubesTitle = ['Company', 'Past Events', 'Futur Events'];
  // list variables
  dataList;
  dataListKeys;
  dataListIcons = ['fa fa-user', 'fa fa-user', 'fa fa-building', 'fa fa-envelope', 'fa fa-phone'];

  constructor(private router: Router,
    private eventService: EventsService,
    private companiesService: CompaniesService,
    private representantsService: RepresentantsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private staticService: StaticService) {

      // stat
    this.staticService.getTotalCompany().then(total => this.valStat[0] = total);
    this.staticService.getTotalRepresentant().then(total => this.valStat[1] = total);
    this.staticService.getTotalAccount().then(total => this.valStat[2] = total);

    this.route.params.subscribe(params => {
      this.representantsService.getRepresentantDetails(params['id'])
        .subscribe(data => {
          this.usersService.getUsers().subscribe(user => {
            const users = user;
            // table
            let companies;
            this.companiesService.getCompany().subscribe(res => {
              companies = res;
              this.dataList = Representant.map(data.representants, companies);
              this.dataListKeys = Object.keys(this.dataList[0]);
              // cubes
              this.cubesData.push(data.entreprises.length, data.past_events_counts, data.future_events_counts);
              // tables
              // event
              this.dataEvents = Event.map(data.events, users);
              if (this.dataEvents.length > 0) {
                this.keysEvent = Object.keys(this.dataEvents[0]);
              }
              // comapies
              this.dataCompanies = Company.map(data.entreprises);
              if (this.dataCompanies.length > 0) {
                this.keysCompany = Object.keys(this.dataCompanies[0]);
              }
            });
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

  deleteCompany(id) {
    this.companiesService.deleteCompany(id)
      .subscribe(data => {
        this.dataCompanies.splice(this.dataCompanies.indexOf(id), 1);
      });
  }

  deleteRepresentants(id) {
    this.eventService.deleteEvent(id)
      .subscribe(data => this.router.navigateByUrl('/representants'));
  }

}
