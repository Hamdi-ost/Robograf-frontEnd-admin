import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepresentantsService {

  constructor(private http: HttpClient) { }

  deleteRepresentant(id) {
    return this.http.delete('http://localhost:8000/api/representants/' + id);
  }
}
