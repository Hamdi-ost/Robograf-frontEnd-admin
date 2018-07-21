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
  user: User = new User();

  constructor(
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.user.name = this.name;
    this.user.email = this.email;
    this.user.password = this.password;

    // Required  Fields
    if (!this.validateService.validateUserRegister(this.user)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Add user
    this.usersService.addUser(this.user)
    .subscribe(data => this.router.navigateByUrl('/users'));

  }

}
