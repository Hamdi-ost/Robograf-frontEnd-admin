import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details-cubes',
  templateUrl: './details-cubes.component.html',
  styleUrls: ['./details-cubes.component.css']
})
export class DetailsCubesMachineComponent implements OnInit {
  @Input() cubesData;
  
  constructor() { }

  ngOnInit() {
  }

}
