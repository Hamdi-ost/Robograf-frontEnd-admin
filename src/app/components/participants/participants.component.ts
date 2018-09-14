import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../../services/participants.service';
import { StaticService } from '../../services/static.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  title = 'participants';
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  colTitles = ['Name', 'last Name', 'Gender', 'Email', 'Age', 'Phone', 'Event'];
  data: any[];
  keys: any[];
  createLink = '/createParticipant';

  constructor(private participantsService: ParticipantsService, private staticService: StaticService) {
    this.fetchData();
  }

  fetchData() {

    // stat
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
    this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);

    this.participantsService.getParticipant()
      .subscribe(data => {
        this.data = data.reverse();
        if (this.data.length !== 0) {
          this.keys = Object.keys(this.data[0]);
        }
      }
      );
  }

  deleteParticipant(id) {
    this.participantsService.deleteParticipant(id)
      .subscribe(data => {
        this.fetchData();
      });
  }

  ngOnInit() {
  }

}
