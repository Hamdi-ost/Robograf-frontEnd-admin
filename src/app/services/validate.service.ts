import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(machine) {
    if (machine.name === undefined || machine.type === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateUserRegister(user) {
    if (user.name === undefined || user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateAccountRegister (account) {
    if (account.username === undefined || account.password === undefined ) {
      return false;
    } else {
      return true;
    }
  }

  valideEventRegister(event) {
    // tslint:disable-next-line:max-line-length
    if (event.name === undefined || event.subject === undefined || event.location === undefined || event.description === undefined || event.email_template_id === undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateRepresentant(representant) {
    // tslint:disable-next-line:max-line-length
    if (representant.first_name === undefined || representant.last_name === undefined || representant.email === undefined || representant.phone === undefined || representant.entreprise_id === undefined) {
      return false;
    } else {
      return true;
    }
  }


  validateCompany(company) {
    if (company.name === undefined || company.matricule === undefined || company.activity === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateParticipant(participant) {
    // tslint:disable-next-line:max-line-length
    if (participant.name === undefined || participant.email === undefined || participant.last_name === undefined || participant.phone === undefined ) {
      return false;
    } else {
      return true;
    }
  }
}
