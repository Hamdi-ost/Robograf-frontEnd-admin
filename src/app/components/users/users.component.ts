import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = 'users';
  colTitles = ['Roles', 'Email', 'Name'];
  data: any[];
  keys: any[];
  createLink = '/createUser';

  constructor(private usersService: UsersService , private route: ActivatedRoute) {
    this.fetchData();
  }

  fetchData() {
    this.usersService.getUsers()
    .subscribe(data => {
      console.log(data);
      this.data = data.reverse();
      this.keys = Object.keys(this.data[0]);
    });
  }
  ngOnInit() {
  }

  deleteuser (id) {
    this.usersService.deleteUser(id)
    .subscribe(data => {
      this.fetchData();
    });
  }

}
