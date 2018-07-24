import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  addCompany(company) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/entreprises', company, {headers: header});
  }

  getCompany() {
    return this.http.get<any[]>('http://localhost:8000/api/entreprises')
    .pipe(map(res => Company.map(res))
    );
  }

  getCompanyDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/entreprises/' + id );
  }

  deleteCompany(id) {
    return this.http.delete('http://localhost:8000/api/entreprises/' + id);
  }

  editCompany(id, modifiedCompany) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/entreprises/' + id, modifiedCompany, {headers: header});
  }
}
