import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-client-form',
  templateUrl: './new-client-form.component.html',
  styleUrls: ['./new-client-form.component.css']
})
export class NewClientFormComponent implements OnInit {
  @Input() hidden;
  constructor() { }

  ngOnInit() {
  }

}
