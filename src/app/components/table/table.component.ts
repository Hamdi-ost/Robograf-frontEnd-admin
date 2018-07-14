import { Component, OnInit , Input} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() title;
  @Input() colTitles;
  @Input() data:any[];
  @Input() keys:any[];
  @Input() createLink;
  @Input() canBeDesactivated;
  @Input() canAddNew;
  constructor() { }

  ngOnInit() {
  }

}
