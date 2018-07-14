import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  stat=["Total Companies","Total Contacts","Total Accounts"]
  valStat=[1,2,3];
  icon = ["fa fa-building","fa fa-male","fa fa-sign-in"]
  colTitles=["Matricule","Name","Activity"]
  data:any[];
  keys:any[];

  constructor() { }

  ngOnInit() {
  }

}
