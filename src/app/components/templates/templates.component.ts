import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  title = 'templates';
  colTitles = ['state', 'Event', 'Validated Templates'];
  data: any[];
  keys: any[];

  constructor(private templatesService: TemplatesService) {
    this.templatesService.getTemplates()
    .subscribe(data => {
      console.log(data);
      this.data = data;
      this.keys = Object.keys(this.data[0]);
        }
      );
  }

  ngOnInit() {
  }

  deleteTemplate (id) {
    this.templatesService.deleteTemplate(id)
    .subscribe(data => {
        this.data.splice(this.data.indexOf(id), 1);
    });
  }
}
