import { Component, OnInit } from '@angular/core';
import { Permission } from '../../../models/permission';
import { PermissionsService } from '../../../services/permissions.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {

  name;
  description;
  modifiedPermission: Permission = new Permission();

  constructor(private permissionService: PermissionsService,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService) {

    this.route.params.subscribe(params => {
      this.permissionService.getPermissionDetails(params['id'])
        .subscribe(data => {
          this.name = data.name;
          this.description = data.description;
        });
    });
  }

  ngOnInit() {
  }

  Update() {
    this.modifiedPermission.name = this.name;
    this.modifiedPermission.description = this.description;

    this.route.params.subscribe(params => {
      this.permissionService.editPermission(params['id'], this.modifiedPermission)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('Permission updated successfully', { cssClass: 'alert-success', timeout: 3000 });
        });
    });
  }

  back() {
    window.history.back();
  }
}
