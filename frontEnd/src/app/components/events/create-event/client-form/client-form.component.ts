import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  id:string;
  constructor() { }

  ngOnInit() {
  }

  setActiveTab1(){
    this.id="new"
  }

  setActiveTab2(){
    this.id="exist"
  }

}
