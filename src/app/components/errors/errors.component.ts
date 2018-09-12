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
  nbErreurInvalideData = 0;
  nbErreurCamera = 0;

  constructor(private errorService: ErrorsService) {
    this.fetchData();
  }

  fetchData() {
    this.errorService.getPersistentExceptions().subscribe(data => {
      this.data = data;
      this.nbDerreur();
      this.valStat[0] = this.nbErreurInvalideData;
      this.valStat[1] = this.nbErreurCamera;
    });
  }

  nbDerreur() {
    for (const erreur of this.data) {
      if (erreur.type === 'Invalid Data Exception') {
        this.nbErreurInvalideData++;
      } else {
        this.nbErreurCamera++;
      }
    }
  }

  moreBtn() {
    // this.errorService.getPersistentExceptionsDetails()
  }

  dismisAll() {
    this.errorService.dismissAll().subscribe(null, null, () => {
      this.fetchData();
    });
  }

  dismiss (id) {
    this.errorService.dismiss(id).subscribe(null, null, () => {
      this.fetchData();
    });
  }

  ngOnInit() {
  }

}
