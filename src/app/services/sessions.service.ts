import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient) { }

  getSessions(): Observable<any> {
    return this.http.get('http://localhost:8000/api/sessions/');
  }

  getSessionDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/sessions/' + id );
  }

  deleteSession(id) {
    return this.http.delete('http://localhost:8000/api/sessions/' + id);
  }


  editSession(id, modifiedSession) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/sessions/' + id, modifiedSession, {headers: header});
  }

}
