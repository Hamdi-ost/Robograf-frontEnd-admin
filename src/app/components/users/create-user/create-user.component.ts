import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  name;
  email;
  password;
  userRoles = [
    {id: 1, value: 'super-admin', selected: false},
    {id: 2, value: 'admin', selected: false}
  ];

  constructor(
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
  }

  OnSubmit() {
    const rolesId = [];

    for (let i = 0 ; i < this.userRoles.length ; i++) {
        if (this.userRoles[i].selected) {
          rolesId.push(this.userRoles[i].id);
        }
    }
    // Fill the object
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: rolesId
    };

    // Required  Fields
    if (!this.validateService.validateUserRegister(user)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add user
    this.usersService.addUser(user)
    .subscribe(data => this.router.navigateByUrl('/users'));

  }

}
