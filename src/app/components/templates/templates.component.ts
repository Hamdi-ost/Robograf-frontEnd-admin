import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  colTitles=["Event","state","Validated Templates"]
  data:any[];
  constructor() { }

  ngOnInit() {
  }

}