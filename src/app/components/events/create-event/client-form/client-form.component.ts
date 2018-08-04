import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompaniesService } from '../../../../services/companies.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  @Output() newRepresentantForm: EventEmitter<any> = new EventEmitter<any>();

  id: string;
  newRepresentant;
  confirm;
  newId;

  constructor(private companiesService: CompaniesService) {
    this.companiesService
    .getCompany()
    .toPromise()
    .then(data => {
      this.newId = data[data.length - 1].id + 1;
    });
  }
  clinet = {
    name: 'ok'
  };

  ngOnInit() {
  }

  setActiveTab1() {
    this.id = 'new';
  }

  setActiveTab2() {
    this.id = 'exist';
  }

  companyRepresentantSubmit(newRepresentant) {
    this.newRepresentant = newRepresentant;
    this.newRepresentant.entreprise_id = this.newId;
    this.confirm = true;
    this.newRepresentantForm.emit(this.newRepresentant);
  }



}
