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
  colTitles = ['Name', 'Email', 'Role'];
  data: any[];
  keys: any[];
  createLink = '/createUser';

  constructor(private usersService: UsersService , private route: ActivatedRoute) {
    this.usersService.getUsers()
    .subscribe(data => {
      this.data = data;
      this.keys = Object.keys(this.data[0]);
    });
  }

  ngOnInit() {
  }

  deleteuser (id) {
    this.usersService.deleteUser(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

}
