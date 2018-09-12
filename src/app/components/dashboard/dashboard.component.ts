import { DashboardService } from '../../services/dashboard.service';
import {Component} from '@angular/core';
import { StaticService } from '../../services/static.service';

@Component({
  selector: 'app-dashboard-component',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  date ;
  stat = ['Event', 'Sessions', 'Clients', 'Machines'];
  titleStat = ['events', 'sessions', 'companies', 'machines'];
  valStat = [0, 0, 0, 0];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-gears'];

  constructor(private dashboradService: DashboardService, private staticService: StaticService) {
        // stat
        this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
        this.staticService.getTotalSession().then(total => this.valStat[1] = total);
        this.staticService.getTotalCompany().then(total => this.valStat[2] = total);
        this.staticService.getTotalMachine().then(total => this.valStat[3] = total);

      this.dashboradService.getInfo().subscribe(data => {
       this.date = data['date'].date;
       const dat = new Date(this.date.replace( /(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
      });
  }

  prev() {
  // window.location = 'http://localhost:8000/api/dashboard?calendar_date=2018-10-03';
    console.log('prex');
  }

 next() {
   // window.location = 'http://localhost:8000/api/dashboard?calendar_date=2018-10-01';
  console.log('next');
}

}
