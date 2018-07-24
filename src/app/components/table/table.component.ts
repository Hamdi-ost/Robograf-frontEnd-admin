import { Component, OnInit , Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() title;
  @Input() colTitles;
  @Input() data;
  @Input() keys;
  @Input() createLink;
  @Input() canBeDesactivated;
  @Input() canAddNew;
  @Output() deleteX = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() desactivate = new EventEmitter();

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


  open() {
    console.log('ok');
  }

}
