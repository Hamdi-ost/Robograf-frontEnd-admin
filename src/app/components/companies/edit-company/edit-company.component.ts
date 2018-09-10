import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company';
import { Representant } from '../../../models/representant';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CompaniesService } from '../../../services/companies.service';
import { ActivatedRoute } from '@angular/router';
import { RepresentantsService } from '../../../services/representants.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  matricule;
  name;
  activity;
  firstName;
  lastName;
  phone;
  email;
  modifiedCompany: Company = new Company();
  modifiedRepresentant: Representant = new Representant();

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private representantsService: RepresentantsService) {
    this.route.params.subscribe(params => {
      this.companiesService.getCompanyDetails(params['id'])
        .subscribe(data => {

          console.log(data);
          
          this.matricule = data.entreprises[0].matricule;
          this.name = data.entreprises[0].name;
          this.activity = data.entreprises[0].activity;

          this.firstName = data.representants[0].first_name;
          this.lastName = data.representants[0].last_name;
          this.phone = data.representants[0].phone;
          this.email = data.representants[0].email;
        });
    });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  Update() {
    // Set the new Company
    this.modifiedCompany.name = this.name;
    this.modifiedCompany.activity = this.activity;
    this.modifiedCompany.matricule = this.matricule;


    this.representantsService.getRepresentant()
      .subscribe(rep => {
        this.modifiedRepresentant = rep.find(repp => repp.company === this.name);
        this.modifiedRepresentant.lastName = this.lastName;
        this.modifiedRepresentant.firstName = this.firstName;
        this.modifiedRepresentant.email = this.email;
        this.modifiedRepresentant.phone = this.phone;
        this.modifiedRepresentant.company = this.name;
        this.route.params.subscribe(params => {
          this.representantsService.editRepresentant(params[this.modifiedRepresentant.id], this.modifiedRepresentant)
            .subscribe();

          // Required  Fields
          if (!this.validateService.validateCompany(this.modifiedCompany)) {
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
            this.companiesService.editCompany(params['id'], this.modifiedCompany)
              .subscribe(data => {
                this.back();
                this.flashMessages.show('Event updated successfully', { cssClass: 'alert-success', timeout: 3000 });
              });
          });
        });
      });
  }

}
