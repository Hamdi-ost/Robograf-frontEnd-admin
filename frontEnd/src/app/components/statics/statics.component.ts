import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {
  @Input() stat;
  @Input() valStat;
  @Input() icon;
  constructor() { }

  ngOnInit() {
  }

}
