import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';
import { Router } from '@angular/router';
import { Company } from '../../../models/company';
import { Representant } from '../../../models/representant';
import { RepresentantsService } from '../../../services/representants.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  newId;
  name;
  matricule;
  activity;

  firstName;
  lastName;
  email;
  phone;


  constructor(private flashMessages: FlashMessagesService,
    private companiesService: CompaniesService,
    private representasService: RepresentantsService,
    private validateService: ValidateService,
    private router: Router) {
       this.companiesService
         .getCompany()
         .toPromise()
         .then(data => {
           this.newId = data[data.length - 1].id + 1;
         });
     }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    const company = {
      name : this.name,
      matricule: this.matricule,
      activity: this.activity,
    };

    const contact = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone: this.phone,
      entreprise_id: this.newId
    };

    // Required  Fields
    if (!this.validateService.validateCompany(company) && !this.validateService.validateRepresentant(contact)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add company
    this.companiesService.addCompany(company)
      .subscribe(data => {
        this.router.navigateByUrl('/companies');
        this.flashMessages.show('Company created', { cssClass: 'alert-success', timeout: 3000 });
      }, null, () => this.representasService.addRepresentant(contact).subscribe());



  }

}
