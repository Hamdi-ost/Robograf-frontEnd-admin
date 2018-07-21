import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../../../services/sessions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  startTime;
  startDate;
  endDate;
  endTime;
  description;

  constructor(private sessionService: SessionsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.sessionService.getSessionDetails(params['id'])
      .subscribe(data => {
        this.startTime = data.sessions[0].start_time;
        this.startDate = data.sessions[0].date;
        this.endDate = data.sessions[0].end_date;
        this.endTime = data.sessions[0].end_time;
        this.description = data.sessions[0].description;
      });
      // session getAssignedMachines()
      // machine  getAvailableAsync()
   });
  }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
