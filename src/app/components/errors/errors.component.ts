import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  stat=["Invalid Data Exceptions","Camera Disconnected Exceptions"]
  valStat=[1,2];
  icon = ["fa fa-file","fa fa-camera"]
  constructor() { }

  ngOnInit() {
  }

}
