import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from '../../../services/participants.service';
import { MachinesService } from '../../../services/machines.service';
import { SessionsService } from '../../../services/sessions.service';
import { PhotosService } from '../../../services/photos.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-photo',
  templateUrl: './create-photo.component.html',
  styleUrls: ['./create-photo.component.css']
})
export class CreatePhotoComponent implements OnInit {

  sessions;
  machines;
  participants;
  photo = {
    url: null,
    photo_time: null,
    description: null,
    machine_id: null,
    participant_id: null,
    session_id: null
  };

  constructor(
    private participantService: ParticipantsService,
    private machineService: MachinesService,
    private sessionService: SessionsService,
    private photoSerive: PhotosService,
    private flashMessages: FlashMessagesService,
    private router: Router      ) {
      this.machineService.getMachines().subscribe(data => this.machines = data);
      this.sessionService.getSessions().subscribe(data => this.sessions = data);
      this.participantService.getParticipant().subscribe(data => this.participants = data);
     }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  addPhoto() {
    this.photoSerive.addPhoto(this.photo).subscribe();
    this.router.navigateByUrl('/photos');
    this.flashMessages.show('Photo Added', { cssClass: 'alert-success', timeout: 3000 });
  }

}
