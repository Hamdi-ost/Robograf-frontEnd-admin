import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dashboardService: DashboardService) {
    dashboardService.getInfo().subscribe(data => console.log(data));
  }
}
