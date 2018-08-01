import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CompaniesService } from '../../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { RepresentantsService } from '../../../services/representants.service';
import { Representant } from '../../../models/representant';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  firstName;
  lastName;
  email;
  phone;
  entreprise_id;
  companies = [];

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private representantsService: RepresentantsService) {
    this.route.params.subscribe(params => {
      this.representantsService.getRepresentantDetails(params['id'])
        .subscribe(data => {
          this.firstName = data.representants[0].first_name;
          this.lastName = data.representants[0].last_name;
          this.phone = data.representants[0].phone;
          this.email = data.representants[0].email;
          this.entreprise_id = data.representants[0].entreprise.id;
          this.companies.push(data.representants[0].entreprise);
        });
    });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  Update() {
    // Set the new contact
    const contact = {
      first_name : this.firstName,
      last_name : this.lastName,
      email : this.email,
      phone: this.phone,
      entreprise_id: this.entreprise_id
    };

          // Required  Fields
          if (!this.validateService.validateRepresentant(contact)) {
            this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
          }

          // Validate email
          if (!this.validateService.validateEmail(this.email)) {
            this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
            return false;
          }

          // tslint:disable-next-line:no-shadowed-variable
          this.route.params.subscribe(params => {
            this.representantsService.editRepresentant(params['id'], contact)
              .subscribe(data => {
                this.back();
                this.flashMessages.show('Contact updated successfully', { cssClass: 'alert-success', timeout: 3000 });
              });
          });
  }

}
