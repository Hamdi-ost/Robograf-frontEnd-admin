import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MachinesService } from '../../../services/machines.service';
import { ValidateService } from '../../../services/validate.service';
import { Router } from '@angular/router';
import { Participant } from '../../../models/participant';
import { ParticipantsService } from '../../../services/participants.service';

@Component({
  selector: 'app-create-participant',
  templateUrl: './create-participant.component.html',
  styleUrls: ['./create-participant.component.css']
})
export class CreateParticipantComponent implements OnInit {

  name;
  email;
  lastName;
  gender;
  age;
  event;
  phone;
  participant: Participant = new Participant();

  constructor(private flashMessages: FlashMessagesService,
    private participantsService: ParticipantsService,
    private validateService: ValidateService,
    private router: Router) { }

  ngOnInit() {
  }

  OnSubmit() {

    // Fill the object
    this.participant.name = this.name;
    this.participant.lastName = this.lastName;
    this.participant.email = this.email;
    this.participant.age = this.age;
    this.participant.event = this.event;
    this.participant.phone = this.phone;
    if (this.gender === 0) {
      this.participant.gender = false;
    } else {
      this.participant.gender = true;
    }
    console.log(this.participant);

    // Required  Fields
    if (!this.validateService.validateParticipant(this.participant)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // Add Participant
    this.participantsService.addParticipant(this.participant)
    .subscribe(data => {
      this.router.navigateByUrl('/participants');
      this.flashMessages.show('Participant created !!', { cssClass: 'alert-success', timeout: 3000 });
    });
  }

}
