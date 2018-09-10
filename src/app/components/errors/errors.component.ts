import { Component, OnInit } from '@angular/core';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  stat = ['Invalid Data Exceptions', 'Camera Disconnected Exceptions'];
  titleStat = ['DataExceptions', 'CameraExceptions'];
  valStat = [1, 2];
  icon = ['fa fa-file', 'fa fa-camera'];

  data;


  constructor(private errorService: ErrorsService) {
    this.errorService.getPersistentExceptions().subscribe(data => {
          this.data = data;
          console.log(data);
    });
   }

   moreBtn() {
    // this.errorService.getPersistentExceptionsDetails()
  }

  dismiss() {

  }

  ngOnInit() {
  }

}
