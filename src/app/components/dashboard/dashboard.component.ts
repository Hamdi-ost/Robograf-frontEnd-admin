import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { StaticService } from '../../services/static.service';
import { DashboardService } from '../../services/dashboard.service';
import { SessionsService } from '../../services/sessions.service';
import { map } from 'rxjs/operators';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-dashboard-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  stat = ['Event', 'Sessions', 'Clients', 'Machines'];
  titleStat = ['events', 'sessions', 'companies', 'machines'];
  valStat = [0, 0, 0, 0];
  icon = ['fa fa-list', 'fa fa-cubes', 'fa fa-users', 'fa fa-gears'];

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view = 'month';
  date;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;
  startDateEvent: Date;
  endtDateEvent;
  endDate;
  constructor(private modal: NgbModal,
    private dashboradService: DashboardService, private staticService: StaticService,
    private sessionService: SessionsService) {
      this.sessionService.getSessions()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
        this.date = data[i].date;
        this.endDate = data[i].end_date;
        this.startDateEvent = new Date(this.date.replace( /(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
        this.endtDateEvent = new Date(this.endDate.replace( /(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
        this.events.push({
          start: this.startDateEvent,
          end: this.endtDateEvent,
          title: data[i].description,
          color: colors.red
        });
        this.refresh.next();
      }
      });

     // stat
     this.staticService.getTotalEvent().then(total => this.valStat[0] = total);
     this.staticService.getTotalSession().then(total => this.valStat[1] = total);
     this.staticService.getTotalCompany().then(total => this.valStat[2] = total);
     this.staticService.getTotalMachine().then(total => this.valStat[3] = total);

  }

  events: CalendarEvent[] = [];


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


}
