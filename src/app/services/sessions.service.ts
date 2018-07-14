import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  getSessions(): Observable<any>{
    return this.http.get('http://localhost:8000/sessions/')
  }
}
