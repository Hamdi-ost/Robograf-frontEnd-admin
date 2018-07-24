import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  constructor(private http: HttpClient,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private loginRegisterService: LoginRegisterService,
    private tokenService: TokenService) { }

  ngOnInit() {
  }

  onSubmit() {


    this.loginRegisterService.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => {
        this.handleError(error);
      });
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleResponse(data) {
    this.tokenService.handle(data.access_token);
    this.router.navigateByUrl('/dashboard');
  }

}
