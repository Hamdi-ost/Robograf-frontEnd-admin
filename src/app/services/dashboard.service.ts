import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  getInfo() {
    return this.http.get<any[]>('http://localhost:8000/dashboard');
  }
}
