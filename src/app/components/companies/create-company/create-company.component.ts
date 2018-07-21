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

  name;
  matricule;
  activity;

  firstName;
  lastName;
  email;
  phone;

  company: Company = new Company();
  representant: Representant = new Representant();

  constructor( private flashMessages: FlashMessagesService,
    private companiesService: CompaniesService,
    private representasService: RepresentantsService,
    private validateService: ValidateService,
    private router: Router) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.company.name = this.name;
    this.company.matricule = this.matricule;
    this.company.activity = this.activity;

    this.representant.firstName = this.firstName;
    this.representant.lastName = this.lastName;
    this.representant.email = this.email;
    this.representant.phone = this.phone;
    this.representant.company = this.company.name;

    // Required  Fields
    if (!this.validateService.validateCompany(this.company) && !this.validateService.validateRepresentant(this.representant)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

     // Validate email
     if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add representant
    this.representasService.addRepresentant(this.representant)
    .subscribe();
    // Add company
    this.companiesService.addCompany(this.company)
    .subscribe(data => {
      this.router.navigateByUrl('/companies');
      this.flashMessages.show('Company created', { cssClass: 'alert-success', timeout: 3000 });
    });



  }

}
