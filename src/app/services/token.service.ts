import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/login'
  };

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (this.get()) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  loggedIn() {
    return this.isValid();
  }

}
