import { Component, OnInit , Output, Input, EventEmitter} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MachinesService } from '../../services/machines.service';

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

  constructor(private machineService: MachinesService) {}

  ngOnInit() {
  }

  delete (row) {
    this.deleteX.emit(row.id);
  }

}
