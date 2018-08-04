import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../../../services/permissions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-permission',
  templateUrl: './details-permission.component.html',
  styleUrls: ['./details-permission.component.css']
})
export class DetailsPermissionComponent implements OnInit {

  title = 'permissions';
  dataList = [];
  dataListKeys;
  dataListIcons = ['', 'fa fa-address-book', 'fa fa-envelope', 'fa fa-calendar', 'fa fa-calendar', 'fa fa-calendar'];

  constructor(
    private permissionService: PermissionsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.permissionService.getPermissionDetails(params['id'])
      .subscribe(data => {
        this.dataList.push(data);
        this.dataListKeys = Object.keys(this.dataList[0]);
      });
   });
  }

  ngOnInit() {
  }

}
