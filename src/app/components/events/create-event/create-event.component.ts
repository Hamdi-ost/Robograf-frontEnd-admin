import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  index:number=0;
  stat=["Total Event","Total Sessions","Total Participants","Total Photos"]
  valStat=[1,2,3,4];
  icon = ["fa fa-list","fa fa-cubes","fa fa-users","fa fa-picture-o"]
  
  constructor() { }

  ngOnInit() {
  }

  increment(){
    this.index++;
  }

  decrement(){
    this.index--;
  }

}
