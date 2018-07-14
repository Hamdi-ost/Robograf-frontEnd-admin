import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
//components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventsComponent } from './components/events/events.component';
import { MachinesComponent } from './components/machines/machines.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ErrorsComponent } from './components/errors/errors.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TableComponent } from './components/table/table.component';
import { StaticsComponent } from './components/statics/statics.component';
import { CreateMachineComponent } from './components/machines/create-machine/create-machine.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { EventFormComponent } from './components/events/create-event/event-form/event-form.component';
import { SessionFormComponent } from './components/events/create-event/session-form/session-form.component';
import { AccountFormComponent } from './components/events/create-event/account-form/account-form.component';
import { NewClientFormComponent } from './components/events/create-event/client-form/new-client-form/new-client-form.component';
import { ExistingClientFormComponent } from './components/events/create-event/client-form/existing-client-form/existing-client-form.component';
import { ClientFormComponent } from './components/events/create-event/client-form/client-form.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsMachineComponent } from './components/machines/details-machine/detailsMachine.component';
import { DetailsListMachineComponent } from './components/details/details-list/details-list.component';
import { DetailsCubesMachineComponent } from './components/details/details-cubes/details-cubes.component';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';




const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'events', component: EventsComponent },
  { path: 'machines', component: MachinesComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'errors', component: ErrorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'createMachine', component: CreateMachineComponent },
  { path: 'createEvent', component: CreateEventComponent },
  { path: 'machines/:id', component: DetailsMachineComponent },
  { path: 'events/:id', component: DetailsEventComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    EventsComponent,
    MachinesComponent,
    TemplatesComponent,
    CompaniesComponent,
    ContactsComponent,
    ErrorsComponent,
    LoginComponent,
    LogoutComponent,
    TableComponent,
    StaticsComponent,
    CreateMachineComponent,
    CreateEventComponent,
    EventFormComponent,
    SessionFormComponent,
    AccountFormComponent,
    NewClientFormComponent,
    ExistingClientFormComponent,
    ClientFormComponent,
    EditComponent,
    DetailsMachineComponent,
    DetailsListMachineComponent,
    DetailsCubesMachineComponent,
    DetailsEventComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    CalendarModule.forRoot(),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }