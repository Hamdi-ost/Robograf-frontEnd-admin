import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url = window.location.href;
  loggedIn;
  constructor(private authService: AuthService) {
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
  }
}
