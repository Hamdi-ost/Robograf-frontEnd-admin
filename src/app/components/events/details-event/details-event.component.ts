import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { Event } from '../../../models/event'

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {

  //stat variables
  stat = ["Total Event", "Total Sessions", "Total Participants", "Total Photos"]
  valStat = [1, 2, 3, 4];
  icon = ["fa fa-list", "fa fa-cubes", "fa fa-users", "fa fa-picture-o"]
  //table variables
  colTitlesS = ["Number", "Start Date", "Start Time", "End Time", "Description", "Event","End Time"]
  colTitlesR = ["First Name", "Last Name", "Company", "Email", "Phone"]
  colTitlesA = ["Username", "Link", "Event", "Author", "Permissions"]
  repLength;
  data: any[]=[];
  dataR: any[]=[]
  keys: any[];
  keysR: any[];
  

  //cubes variables
  cubesData=[];
  //list variables
  dataList;
  dataListKeys;
  dataListIcons=["fa fa-tags","fa fa-map-marker","fa fa-building","fa fa-envelope","fa fa-pencil","fa fa-pencil"]

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
        this.eventService.getEventDetails(params['id'])
        .subscribe(data => {
          //list
          this.dataList= Event.map(data.events)
          this.dataList.push(data.entreprises_array)
          delete this.dataList [0]['participants']
          delete this.dataList [0]['sessions']
          delete this.dataList [0]['id']
          delete this.dataList [0]['accounts']
          delete this.dataList [0]['email_template_id']
          this.dataListKeys=Object.keys(this.dataList[0])
          this.dataListKeys.push(this.dataList[1])
          //tabl
           //session
          this.repLength= data.representants.length;
          if(data.sessions.length>0){
          delete data.sessions [0]['created_at']
          delete data.sessions [0]['deleted_at']
          delete data.sessions[0]['id']
          delete data.sessions [0]['updated_at']
          delete data.sessions [0]['pivot']
          this.data=data.sessions
          this.keys=Object.keys(this.data[0]);
          console.log(this.data)
          }
           //reprsentant
           if(data.representants.length>0){
            delete data.representants [0]['created_at']
            delete data.representants [0]['deleted_at']
            delete data.representants [0]['id']
            delete data.representants [0]['updated_at']
            delete data.representants [0]['pivot']
            this.dataR=data.representants
            this.keysR=Object.keys(this.dataR[0]);
            console.log(this.keysR)
            }
          //cubes
          this.cubesData.push(data.events_count,data.nextSession,data.photos_count,data.next_available_date)
        })
      })
    }

  ngOnInit() {
  }

}
