import { Component, OnInit } from '@angular/core';
import { RepresentantsService } from '../../services/representants.service';
import { CompaniesService } from '../../services/companies.service';
import { Representant } from '../../models/representant';
import { StaticService } from '../../services/static.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  stat = ['Total Companies', 'Total Contacts', 'Total Accounts'];
  titleStat = ['companies', 'representants', 'accounts'];
  valStat = [1, 2, 3];
  icon = ['fa fa-building', 'fa fa-male', 'fa fa-sign-in'];
  colTitles = ['First Name', 'Last Name', 'Email', 'phone', 'company'];
  data: any[];
  keys: any[];
  title = 'representants';
  createLink = '/createRepresentant';

  constructor(private representantsService: RepresentantsService, private staticService: StaticService) {
    // stat
    this.staticService.getTotalCompany().then(total => this.valStat[0] = total);
    this.staticService.getTotalRepresentant().then(total => this.valStat[1] = total);
    this.staticService.getTotalAccount().then(total => this.valStat[2] = total);

    this.representantsService.getRepresentant()
    .subscribe(data => {
       this.data = data.reverse();
      this.keys = Object.keys(this.data[0]);

  });
}

  ngOnInit() {
  }

  deleteRepresentant(id) {
    this.representantsService.deleteRepresentant(id)
    .subscribe(data => {
      this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
    });
  }

}
