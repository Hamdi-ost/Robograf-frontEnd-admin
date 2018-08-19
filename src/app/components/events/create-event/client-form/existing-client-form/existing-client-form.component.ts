import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RepresentantsService } from '../../../../../services/representants.service';
import { EventsService } from '../../../../../services/events.service';
import { CompaniesComponent } from '../../../../companies/companies.component';
import { CompaniesService } from '../../../../../services/companies.service';

@Component({
  selector: 'app-existing-client-form',
  templateUrl: './existing-client-form.component.html',
  styleUrls: ['./existing-client-form.component.css']
})
export class ExistingClientFormComponent implements OnInit {
  hidden = true;
  @Output() ExistRepresentantForm: EventEmitter<any> = new EventEmitter<any>();

  companyRepresentant = {
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    entreprise_id: null
  };

  ExistRepresentants;
  entreprises;
  repId;

  constructor(private representantService: RepresentantsService, private companyService: CompaniesService) {
    this.representantService.getRepresentant()
      .subscribe(data => {
    this.ExistRepresentants = data;
    });
    this.companyService
      .getCompany()
      .toPromise()
      .then(data => {
        this.entreprises = data;
      });
   }

  ngOnInit() {
  }

  representantToggle() {
  this.hidden = ! this.hidden;
  }


  send() {
    console.log(this.repId);
    this.ExistRepresentantForm.emit(this.companyRepresentant);
  }

}
