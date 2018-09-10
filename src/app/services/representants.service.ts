import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Representant } from '../models/representant';
import { map } from 'rxjs/operators';
import { CompaniesService } from './companies.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentantsService {
  companies;
  constructor(private companiesService: CompaniesService, private http: HttpClient ) {

  }


  getCompanies() {
    this.companiesService.getCompany().subscribe(data => this.companies = data);
  }

  addRepresentant(representant) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/representants', representant, {headers: header});
  }

  getRepresentant() {
    this.getCompanies();
    return this.http.get<any[]>('http://localhost:8000/api/representants')
    .pipe(map(res => Representant.map(res, this.companies)));
  }

  getRepresentantDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/representants/' + id );
  }

  editRepresentant(id, modifiedRepresentant) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/representants/' + id, modifiedRepresentant, {headers: header});
  }

  deleteRepresentant(id) {
    return this.http.delete('http://localhost:8000/api/representants/' + id);
  }
}
