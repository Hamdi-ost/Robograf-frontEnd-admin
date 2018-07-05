import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  stat=["Total Companies","Total Contacts","Total Accounts"]
  valStat=[1,2,3];
  icon = ["fa fa-building","fa fa-male","fa fa-sign-in"]
  colTitles=["First Name","Last Name","Company","Email","Phone"]
  data:any[];
  keys:any[];
  constructor() { }

  ngOnInit() {
  }

}
