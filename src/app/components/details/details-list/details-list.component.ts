import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListMachineComponent implements OnInit {
  @Input() dataList;
  @Input() dataListIcons;
  @Input() dataListKeys;
  @Input() title;
  @Output() deleteX = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete (id) {
    this.deleteX.emit(id);
  }

}
