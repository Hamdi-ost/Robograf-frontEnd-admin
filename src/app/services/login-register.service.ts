import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  signup(data) {
    return this.http.post('http://localhost:8000/api/signup', data);
  }

  login(data) {
    return this.http.post('http://localhost:8000/api/login', data);
  }
}
