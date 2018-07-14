import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListMachineComponent implements OnInit {
  @Input() dataList;
  @Input() dataListIcons;
  @Input() dataListKeys;
  
  constructor() { }

  ngOnInit() {
  }

}
