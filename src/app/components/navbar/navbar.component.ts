import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router, private tokenServe: TokenService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.tokenServe.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }

}
