import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(machine) {
    if (machine.name == undefined || machine.type == undefined){
      return false}
    else{
      return true;}
  }

}
