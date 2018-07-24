import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRegisterService } from '../../services/login-register.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email : null,
    password : null
  };

  public error = [];

  constructor(private loginRegisterService: LoginRegisterService,
    private tokenService: TokenService,
  private router: Router,
  private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginRegisterService.login(this.form).subscribe(
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
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard');
  }

}
