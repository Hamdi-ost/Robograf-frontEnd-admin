import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  deleteAccount(id) {
    return this.http.delete('http://localhost:8000/api/accounts/' + id);
  }
}
