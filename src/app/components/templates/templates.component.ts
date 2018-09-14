import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  title = 'templates';
  colTitles = ['state', 'Event', 'Validated Templates'];
  data: any[] = [];
  keys: any[] = [];

  constructor(private templatesService: TemplatesService, private flashMessageService: FlashMessagesService) {
    this.templatesService.getTemplateNegotiations()
      .subscribe(data => {
        this.data = data.reverse();
        if (this.data.length !== 0) {
          this.keys = Object.keys(this.data[0]);
        }
      }
      );
  }

  ngOnInit() {
  }

  deleteTemplate(id) {
    this.templatesService.deleteTemplate(id)
      .subscribe(data => {
        this.data.splice(this.data.indexOf(this.data.find(res => res.id === id)), 1);
      });
  }

  closeTemplate(id) {
    this.templatesService.close(id).subscribe(data => {
      this.flashMessageService.show('Template closed', { cssClass: 'alert-danger', timeout: 3000 });
      this.data.find(template => template.id === id).state = 'Closed';
    });
  }

  openTemplate(id) {
    this.templatesService.open(id).subscribe(data => {
      this.flashMessageService.show('Template opened', { cssClass: 'alert-success', timeout: 3000 });
      this.data.find(template => template.id === id).state = 'Open';
    });
  }

}
