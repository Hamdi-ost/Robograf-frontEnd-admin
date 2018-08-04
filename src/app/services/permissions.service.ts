import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  addPermission(permission) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8000/api/permissions', permission, {headers: header});
  }

  getPermissionDetails(id): Observable<any> {
    return this.http.get('http://localhost:8000/api/permissions/' + id);
  }

  deletePermission(id) {
    return this.http.delete('http://localhost:8000/api/permissions/' + id);
  }

  getPermissions() {
    return this.http.get<any[]>('http://localhost:8000/api/permissions')
    .pipe(map(res =>  res.map(el => Permission.map(el))));
  }

  editPermission(id, modifiedPermission) {
    const header = new HttpHeaders ();
    header.append('Content-Type', 'application/json');
    return this.http.patch('http://localhost:8000/api/permissions/' + id, modifiedPermission, {headers: header});
  }

}
