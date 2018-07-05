import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  index:number=0;
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
