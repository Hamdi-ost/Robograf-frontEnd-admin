import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

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
  colTitles = ['Url', 'Photo Time', 'Machine', 'Session', 'Event', 'Participant'];
  data: any[];
  keys: any[];
  createLink = '/createPhoto';

  constructor(private photosService: PhotosService) {
    this.photosService.getPhoto()
    .subscribe(data => {
      this.data = data;
      this.keys = Object.keys(this.data[0]);
        }
      );
    }

  ngOnInit() {
  }

  deletePhoto (id) {
    this.photosService.deletePhoto(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }

}
