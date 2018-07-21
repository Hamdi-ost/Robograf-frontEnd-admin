import { Component, OnInit } from '@angular/core';
import { RepresentantsService } from '../../services/representants.service';
import { CompaniesService } from '../../services/companies.service';
import { Representant } from '../../models/representant';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  stat = ['Total Companies', 'Total Contacts', 'Total Accounts'];
  valStat = [1, 2, 3];
  icon = ['fa fa-building', 'fa fa-male', 'fa fa-sign-in'];
  colTitles = ['First Name', 'Last Name', 'Email', 'phone', 'company'];
  data: any[];
  keys: any[];
  title = 'representants';
  createLink = '/createRepresentant';

  constructor(private representantsService: RepresentantsService, private companiesService: CompaniesService) {
    this.representantsService.getRepresentant()
    .subscribe(data => {
       this.data = data;
      this.keys = Object.keys(this.data[0]);

  });
}

  ngOnInit() {
  }

  deleteRepresentant(id) {
    this.representantsService.deleteRepresentant(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

}
