import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-existing-client-form',
  templateUrl: './existing-client-form.component.html',
  styleUrls: ['./existing-client-form.component.css']
})
export class ExistingClientFormComponent implements OnInit {
  hidden:boolean=true;
  constructor() { }

  ngOnInit() {
  }

  representantToggle(){
  this.hidden=!this.hidden;
  console.log(this.hidden)
  }

}
