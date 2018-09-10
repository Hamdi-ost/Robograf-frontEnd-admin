import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  name;
  email;
  password;
  modifiedUser: User = new User();
  userRoles = [
    {id: 1, value: 'super-admin', selected: false},
    {id: 2, value: 'admin', selected: false}
  ];


  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService) {

    this.route.params.subscribe(params => {
      this.usersService.getUserDetails(params['id'])
        .subscribe(data => {
          this.name = data.name;
          this.email = data.email;
          this.password = data.password;
        });
    });
  }

  ngOnInit() {
  }

  Update() {
    const rolesId = [];

    for (let i = 0 ; i < this.userRoles.length ; i++) {
        if (this.userRoles[i].selected) {
          rolesId.push(this.userRoles[i].id);
        }
    }

    this.modifiedUser.name = this.name;
    this.modifiedUser.email = this.email;
    this.modifiedUser.password = this.password;
    this.modifiedUser.roles = rolesId;

    // Required  Fields
    if (!this.validateService.validateUserRegister(this.modifiedUser)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.route.params.subscribe(params => {
      this.usersService.editUser(params['id'], this.modifiedUser)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('User updated successfully', { cssClass: 'alert-success', timeout: 3000 });
        });
    });
  }

  back() {
    window.history.back();
  }

}
