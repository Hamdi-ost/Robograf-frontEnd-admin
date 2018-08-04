import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../../services/permissions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  title = 'permissions';
  colTitles = ['Name', 'Description'];
  data: any[];
  keys: any[];
  createLink = '/createPermission';

  constructor(private permissionService: PermissionsService , private route: ActivatedRoute) {
    this.permissionService.getPermissions()
    .subscribe(data => {
      this.data = data.reverse();
      this.keys = Object.keys(this.data[0]);
    });
  }

  ngOnInit() {
  }

  deletePermission (id) {
    this.permissionService.deletePermission(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
    });
  }

}
