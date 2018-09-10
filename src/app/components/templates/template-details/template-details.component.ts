import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../../services/templates.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {

  templates: any[];
  title = 'templatesDetails';
  colTitles = ['Url', 'State', 'Upload Date'];
  keys: any[];

  constructor(private templateService: TemplatesService) {
    templateService.getTemplate().subscribe(data => {
      console.log(data);
     this.templates = data.reverse();
     this.keys = Object.keys(this.templates[0]);
    });
  }

  ngOnInit() {
  }

}
