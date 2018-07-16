import { Component, OnInit, OnChanges, Output , EventEmitter } from '@angular/core';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit, OnChanges {
  @Output() eventChanged: EventEmitter<any> = new EventEmitter<any>();
  public event = new Event();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.eventChanged.emit(this.event);
  }

}
