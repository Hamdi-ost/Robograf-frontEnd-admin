import { Component, OnInit , Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() eventId;
  @Input() title;
  @Input() colTitles;
  @Input() data;
  @Input() state;
  @Input() keys;
  @Input() createLink;
  @Input() canBeDesactivated;
  @Input() canAddNew;
  @Input() detach;
  @Output() deleteX = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() desactivate = new EventEmitter();
  @Output() open = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() detachMachine = new EventEmitter();
  url;

  constructor() {}

  ngOnInit() {
  }

  delete (row) {
    this.deleteX.emit(row.id);
  }

  activateMachine (row) {
    this.activate.emit(row.id);
  }

  desactivateMachine (row) {
    this.desactivate.emit(row.id);
  }


  openTemplate(row) {
    this.open.emit(row.id);
  }

  closeTemplate(row) {
    this.close.emit(row.id);
  }

  detachX (row) {
    this.detachMachine.emit(row.id);
  }

  click(url) {
    this.url = url;
  }

}
