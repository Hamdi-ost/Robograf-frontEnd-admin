import { Component, OnInit } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  
  title="machines"
  stat=["Desactivated","Scheduled Today","Available Today","Scheduled Tomorrow"]
  valStat=[1,2,3,4];
  icon = ["fa fa-power-off","fa fa-calendar-check-o","fa fa-check","fa fa-calendar"]
  colTitles=["Name","Type","Status"]
  data:any[];
  keys:any[];
  createLink="/createMachine"
  
  constructor(private machineService: MachinesService , private route: ActivatedRoute) { 
    this.machineService.getMachines()
    .subscribe(data=>
      {
      this.data=data;
      this.keys=Object.keys(this.data[0]);
      //Statics Values
      var desactivated=0;
      var availableToday=0;
      var scheduledToday=0;
      var scheduledTomorrow=0;
      for (var i=0;i<data.length;i++){
        if (data[i].active==0)
        desactivated++
        machineService.getMachineDetails(i+1)
          .subscribe(data => {
              var today = new Date()
              var tomorrow =  new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
              var tempdateAvaib = new Date (data.next_available_date.split('-')[0],data.next_available_date.split('-')[1]-1,data.next_available_date.split('-')[2])
              if (tempdateAvaib.getTime()==today.getTime())
              availableToday++
              for (var j=0;j<data.sessions.length;j++){
                if (new Date (data.sessions[j].date.split('-')[0],data.sessions[j].date.split('-')[1]-1,data.sessions[j].date.split('-')[2]).getTime()==today.getTime())
                  scheduledToday++
                if (new Date (data.sessions[j].date.split('-')[0],data.sessions[j].date.split('-')[1]-1,data.sessions[j].date.split('-')[2]).getTime()==tomorrow.getTime())
                  scheduledTomorrow++ 
              }
              this.valStat[0]=desactivated;
              this.valStat[1]=scheduledToday;
              this.valStat[2]=availableToday;
              this.valStat[3]=scheduledTomorrow;
          })
      }
      
    })
    
    
  }

  ngOnInit() {
  }

}
