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
  titleForListDetails="events"
  //stat variables
  stat = ["Total Event", "Total Sessions", "Total Participants", "Total Photos"]
  valStat = [1, 2, 3, 4];
  icon = ["fa fa-list", "fa fa-cubes", "fa fa-users", "fa fa-picture-o"]
  //table variables
  colTitlesS = ["Number", "Start Date", "Start Time", "End Time", "Description", "Event","End Time"]
  colTitlesR = ["First Name", "Last Name", "Company", "Email", "Phone"]
  colTitlesA = ["Username", "Link", "Event", "Author", "Permissions"]
  repLength;
  dataSessions: any[]=[];
  dataRepresentants: any[]=[]
  dataAccounts: any[]=[]
  keySessions: any[];
  keyRepresentatnts: any[];
  keyAccounts: any[];

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
          this.dataList= data.events[0]
          delete this.dataList ['event_id']
          delete this.dataList ['created_at']
          delete this.dataList ['deleted_at']
          delete this.dataList ['photos']
          delete this.dataList ['participants']
          delete this.dataList ['email_template_id']
          delete this.dataList ['updated_at']
          this.dataListKeys=Object.keys(this.dataList)
          console.log(this.dataList)
          //cubes
          this.cubesData.push(data.remaining_sessions_count,data.nextSession,data.photos_count,data.participants_count)
          //tables
           //Sessions
             this.dataSessions=data.sessions
             delete this.dataSessions[0] ['description']
             delete this.dataSessions [0]['event_id']
             delete this.dataSessions [0]['created_at']
             delete this.dataSessions [0]['deleted_at']
             delete this.dataSessions [0]['photos']
             delete this.dataSessions [0]['machines']
             delete this.dataSessions [0]['updated_at']
             this.keySessions=Object.keys(this.dataSessions[0])
             console.log(this.dataSessions)
           //Representatnts
             this.dataRepresentants=data.representants
             this.keyRepresentatnts=Object.keys(this.dataRepresentants[0])
           //Accounts
             this.dataAccounts=data.accounts
             this.keyAccounts=Object.keys(this.dataAccounts[0])  
        })
      })
    }

  ngOnInit() {
  }

}
