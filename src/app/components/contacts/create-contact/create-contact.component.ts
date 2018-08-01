import { Component, OnInit } from '@angular/core';
import { Representant } from '../../../models/representant';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RepresentantsService } from '../../../services/representants.service';
import { Router } from '@angular/router';
import { CompaniesComponent } from '../../companies/companies.component';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  firstName;
  lastName;
  email;
  phone;
  entreprise_id;
  companies;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private representantService: RepresentantsService,
    private companiesService: CompaniesService,
    private router: Router) {
      this.companiesService.getCompany().subscribe(data => this.companies = data);

     }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  OnSubmit() {

    const contact = {
      first_name : this.firstName,
      last_name : this.lastName,
      email : this.email,
      phone: this.phone,
      entreprise_id: this.entreprise_id
    };

    console.log(contact);
      // Required  Fields
      if (!this.validateService.validateRepresentant(contact)) {
        this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      }

       // email  Fields
       if (!this.validateService.validateEmail(this.email)) {
        this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
        return false;
      }



    // Add representant
    this.representantService.addRepresentant(contact)
    .subscribe(res => this.back());


  }

}
