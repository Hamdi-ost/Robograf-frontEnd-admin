import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  title = 'companies';
  stat = ['Total Companies', 'Total Contacts', 'Total Accounts'];
  titleStat = ['companies', 'representants', 'accounts'];
  valStat = [1, 2, 3];
  icon = ['fa fa-building', 'fa fa-male', 'fa fa-sign-in'];
  colTitles = ['Matricule', 'Name', 'Activity'];
  data: any[];
  keys: any[];
  createLink = '/createCompany';

  constructor(private companiesService: CompaniesService) {
    this.companiesService.getCompany()
    .subscribe(data => {
      this.data = data;
      this.keys = Object.keys(this.data[0]);
        }
      );
  }



  ngOnInit() {}

  deleteCompany (id) {
    this.companiesService.deleteCompany(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

}
