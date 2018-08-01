import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../../services/participants.service';

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

  constructor(private participantsService: ParticipantsService) {
    this.participantsService.getParticipant()
    .subscribe(data => {
      this.data = data.reverse();
      this.keys = Object.keys(this.data[0]);
        }
      );
  }


  deleteParticipant (id) {
    this.participantsService.deleteParticipant(id)
    .subscribe(data => {
      this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
    });
  }

  ngOnInit() {
  }

}
