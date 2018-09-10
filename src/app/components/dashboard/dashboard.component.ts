import { DashboardService } from '../../services/dashboard.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  date ;
  constructor(private dashboradService: DashboardService) {
      this.dashboradService.getInfo().subscribe(data => {
       this.date = data['date'].date;
       const dat = new Date(this.date.replace( /(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
       console.log(dat);
       console.log(data);
      });
  }

  prev() {
  //  window.location = 'http://localhost:8000/api/dashboard?calendar_date=2018-10-03';
    console.log('prex');
  }

 next() {
  // window.location = 'http://localhost:8000/api/dashboard?calendar_date=2018-10-01';
  console.log('next');
}

}
