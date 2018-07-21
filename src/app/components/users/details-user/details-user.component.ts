import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  title = 'users';
  dataList;
  dataListKeys;
  dataListIcons = ['', 'fa fa-address-book', 'fa fa-envelope', 'fa fa-calendar', 'fa fa-calendar'];

  constructor(
    private router: Router,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.usersService.getUserDetails(params['id'])
      .subscribe(data => {
        this.dataList = data;
        this.dataListKeys = Object.keys(this.dataList);
      });
   });
  }

  ngOnInit() {
  }

  deleteUser (id) {
    this.usersService.deleteUser(id)
    .subscribe(data => this.router.navigateByUrl('/users'));
  }

}
