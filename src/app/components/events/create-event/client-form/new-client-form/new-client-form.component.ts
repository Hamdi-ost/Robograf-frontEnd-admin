import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-client-form',
  templateUrl: './new-client-form.component.html',
  styleUrls: ['./new-client-form.component.css']
})
export class NewClientFormComponent implements OnInit {
  @Input() hidden;
  @Output() newRepresentantForm: EventEmitter<any> = new EventEmitter<any>();

  companyRepresentant = {
    matricule: null,
    name: null,
    activity: null,
    first_name: null,
    last_name: null,
    email: null,
    phone: null
  };

  constructor() { }

  ngOnInit() {
  }

  send() {
    this.newRepresentantForm.emit(this.companyRepresentant);
  }



}
