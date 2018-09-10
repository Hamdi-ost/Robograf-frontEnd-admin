import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../../services/photos.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../../models/photo';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  photo = {
    url: null,
    photo_time: null,
    description: null,
    machine_id: null,
    participant_id: null,
    session_id: null
  };

  constructor(
    private photoServie: PhotosService,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService) {
    this.route.params.subscribe(params => {
      this.photoServie.getPhotoDetails(params['id'])
        .subscribe(data => {
          this.photo.url = data.photos[0].url;
          this.photo.photo_time = data.photos[0].photo_time;
          this.photo.machine_id = data.photos[0].machine_id;
          this.photo.participant_id = data.photos[0].participant_id;
          this.photo.session_id = data.photos[0].session_id;
          this.photo.description = data.photos[0].description;
        });
    });
  }

  back() {
    window.history.back();
  }

  update() {
    this.route.params.subscribe(params => {
      this.photoServie.editPhoto(params['id'], this.photo)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('Machine updated successfully', { cssClass: 'alert-success', timeout: 3000 });
      });
    });
  }

  ngOnInit() {
  }

}
