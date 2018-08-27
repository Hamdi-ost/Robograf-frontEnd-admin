import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MachinesService } from '../../../services/machines.service';
import { ValidateService } from '../../../services/validate.service';
import { Router } from '@angular/router';
import { Participant } from '../../../models/participant';
import { ParticipantsService } from '../../../services/participants.service';
import { EventsService } from '../../../services/events.service';

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
  event_id;
  events;
  phone;

  constructor(private flashMessages: FlashMessagesService,
    private participantsService: ParticipantsService,
    private validateService: ValidateService,
    private router: Router,
    private eventService: EventsService) {
    this.eventService.getEvent().subscribe(data => this.events = data);
  }

  ngOnInit() {
  }

  OnSubmit() {

    if (this.gender === 0) {
      this.gender = false;
    } else {
      this.gender = true;
    }

    const participant = {
      email: this.email,
      name: this.name,
      last_name: this.lastName,
      gender: this.gender,
      age: this.age,
      phone: this.phone,
      event_id: Number(this.event_id)
    };

    console.log(participant);

    // Required  Fields
    if (!this.validateService.validateParticipant(participant)) {
      this.flashMessages.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessages.show('Wrong Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    // Add Participant
    this.participantsService.addParticipant(participant)
      .subscribe(data => {
        this.router.navigateByUrl('/participants');
        this.flashMessages.show('Participant created !!', { cssClass: 'alert-success', timeout: 3000 });
      });
  }

}
