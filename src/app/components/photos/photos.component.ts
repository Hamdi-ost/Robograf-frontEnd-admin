import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { StaticService } from '../../services/static.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  title = 'photos';
  stat = ['Total Event', 'Total Sessions', 'Total Participants', 'Total Photos'];
  titleStat = ['events', 'sessions', 'participants', 'photos'];
  valStat = [1, 2, 3, 4];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-picture-o'];
  colTitles = ['Url', 'Photo Time', 'Machine', 'Session', 'Participant', 'Event'];
  data: any[];
  keys: any[];
  createLink = '/createPhoto';

  constructor(private photosService: PhotosService, private staticService: StaticService) {
    this.fetchData();
  }

  ngOnInit() {
  }

  fetchData() {
    // stat
    this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
    this.staticService.getTotalSession().then(total => this.valStat[1] = total);
    this.staticService.getTotalParticipant().then(total => this.valStat[2] = total);
    this.staticService.getTotalPhoto().then(total => this.valStat[3] = total);

    this.photosService.getPhoto()
      .subscribe(data => {
        this.data = data.reverse();
        if (this.data.length !== 0) {
          this.keys = Object.keys(this.data[0]);
        }
      }
      );
  }

  deletePhoto(id) {
    this.photosService.deletePhoto(id)
      .subscribe(data => {
        this.fetchData();
      });
  }

}
