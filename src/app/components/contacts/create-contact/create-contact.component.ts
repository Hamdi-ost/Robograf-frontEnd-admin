import { Component, OnInit } from '@angular/core';
import { Representant } from '../../../models/representant';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RepresentantsService } from '../../../services/representants.service';
import { Router } from '@angular/router';

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
  representant: Representant = new Representant();

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private representantService: RepresentantsService,
    private router: Router) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.representant.firstName = this.firstName;
    this.representant.lastName = this.lastName;
    this.representant.email = this.email;
    this.representant.phone = this.phone;
    this.representant.company = this.entreprise_id;

    // Required  Fields
    if (!this.validateService.validateRepresentant(this.representant)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

     // email  Fields
     if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add representant
    this.representantService.addRepresentant(this.representant)
    .subscribe(data => this.router.navigateByUrl('/representants'));



  }

}
