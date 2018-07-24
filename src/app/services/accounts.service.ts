import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../models/account';
import { UsersService } from './users.service';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient, private usersService: UsersService, private eventsService: EventsService) { }


  addAccount(account) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/accounts', account, { headers: header });
  }


  getAccount() {
    let user;
    let events;
    this.eventsService.getEvent().subscribe(re => {
      events = re;
      re.map(el => user = el.author);
    });

    return this.http.get<any[]>('http://localhost:8000/api/accounts')
      .pipe(map(res => Account.map(res, events, user)));
  }

  getAccountDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/accounts/' + id);
  }


  editAccount(id, modifiedAccount) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/accounts/' + id, modifiedAccount, { headers: header });
  }

  deleteAccount(id) {
    return this.http.delete('http://localhost:8000/api/accounts/' + id);
  }
}
