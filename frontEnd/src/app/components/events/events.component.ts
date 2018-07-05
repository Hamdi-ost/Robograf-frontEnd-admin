import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  stat=["Total Event","Total Sessions","Total Participants","Total Photos"]
  valStat=[1,2,3,4];
  icon = ["fa fa-list","fa fa-cubes","fa fa-users","fa fa-picture-o"]
  colTitles=["Name","ID","Subject","Location","Company","Contact","Author"]
  data:any[];
  keys:any[];
  createLink="/createEvent"

  constructor() { }

  ngOnInit() {
  }

}
