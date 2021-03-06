import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { Company } from '../../models/company';
import { StaticService } from '../../services/static.service';

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



  constructor(private companiesService: CompaniesService, private staticService: StaticService) {
    // stat
    this.staticService.getTotalCompany().then(total => this.valStat[0] = total);
    this.staticService.getTotalRepresentant().then(total => this.valStat[1] = total);
    this.staticService.getTotalAccount().then(total => this.valStat[2] = total);

    this.fetchData();
  }

  fetchData() {
    this.companiesService.getCompany()
      .subscribe(data => {
        this.data = data.reverse();
        if (this.data.length !== 0) {
          this.keys = Object.keys(this.data[0]);
        }
      }
      );
  }

  ngOnInit() { }

  deleteCompany(id) {
    this.companiesService.deleteCompany(id)
      .subscribe(data => {
        this.fetchData();
      });
  }

}
