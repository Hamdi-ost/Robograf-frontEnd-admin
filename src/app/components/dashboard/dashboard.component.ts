import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stat = ['Events', 'Sessions', 'Clients', 'Machines'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-power-off', 'fa fa-calendar-check-o', 'fa fa-chack', 'fa fa-gears'];

  constructor() { }

  ngOnInit() {
  }

}
