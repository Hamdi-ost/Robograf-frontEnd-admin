import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  addUser(user) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/users', user, {headers: header});
  }

  getUserDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/users/' + id);
  }

  deleteUser(id) {
    return this.http.delete('http://localhost:8000/api/users/' + id);
  }

  getUsers() {
    return this.http.get<any[]>('http://localhost:8000/users')
    .pipe(map(res =>  res.map(el => User.map(el))));
  }

  editUser(id, modifiedUser) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/users/' + id, modifiedUser, {headers: header});
  }
}
