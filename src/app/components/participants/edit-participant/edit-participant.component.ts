import { Component, OnInit } from '@angular/core';
import { Participant } from '../../../models/participant';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventsService } from '../../../services/events.service';
import { ActivatedRoute } from '@angular/router';
import { ParticipantsService } from '../../../services/participants.service';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {

  name;
  email;
  lastName;
  age;
  phone;
  gender;
  event;
  modifiedParticipant: Participant = new Participant();

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private eventsService: EventsService,
    private participantsService: ParticipantsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.participantsService.getParticipantDetails(params['id'])
        .subscribe(data => {
          this.name = data.participants[0].name;
          this.email = data.participants[0].email;
          this.lastName = data.participants[0].last_name;
          this.age = data.participants[0].age;
          this.phone = data.participants[0].phone;
          this.gender = data.participants[0].gender;
          this.event = data.participants[0].event_id;
        });
    });
  }

  back() {
    window.history.back();
  }

  ngOnInit() {
  }

  Update() {
    this.modifiedParticipant.name =     this.name;
    this.modifiedParticipant.email =    this.email;
    this.modifiedParticipant.lastName = this.lastName;
    this.modifiedParticipant.age =      this.age;
    this.modifiedParticipant.phone =    this.phone;
    this.modifiedParticipant.gender = this.gender ?  true : false;
    this.modifiedParticipant.event =    this.event;

    // Required  Fields
    /*if (!this.validateService.valideEventRegister(this.modifiedParticipant)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }*/

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.route.params.subscribe(params => {
      this.participantsService.editParticipant(params['id'], this.modifiedParticipant)
        .subscribe(data => {
          this.back();
          this.flashMessages.show('Participant updated successfully', { cssClass: 'alert-success', timeout: 3000 });
        });
    });
  }

}
