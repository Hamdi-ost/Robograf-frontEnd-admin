import { Component, OnInit } from '@angular/core';
import { Permission } from '../../../models/permission';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../services/permissions.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css']
})
export class CreatePermissionComponent implements OnInit {

  name;
  description;
  permission: Permission = new Permission();

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private permissionService: PermissionsService) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.permission.name = this.name;
    this.permission.description = this.description;

    // Add user
    this.permissionService.addPermission(this.permission)
    .subscribe(data => {
      this.router.navigateByUrl('/permissions');
      this.flashMessages.show('Permission added successfully', { cssClass: 'alert-success', timeout: 3000 });
    });

  }

}
