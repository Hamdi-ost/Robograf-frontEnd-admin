import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
// components
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
// tslint:disable-next-line:max-line-length
import { ExistingClientFormComponent } from './components/events/create-event/client-form/existing-client-form/existing-client-form.component';
import { ClientFormComponent } from './components/events/create-event/client-form/client-form.component';
import { EditMachineComponent } from './components/machines/edit-machine/edit.component';
import { DetailsMachineComponent } from './components/machines/details-machine/detailsMachine.component';
import { DetailsListMachineComponent } from './components/details/details-list/details-list.component';
import { DetailsCubesMachineComponent } from './components/details/details-cubes/details-cubes.component';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { EditSessionComponent } from './components/sessions/edit-session/edit-session.component';
import { DetailsSessionComponent } from './components/sessions/details-session/details-session.component';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { DetailsUserComponent } from './components/users/details-user/details-user.component';
import { CreateContactComponent } from './components/contacts/create-contact/create-contact.component';
import { EditContactComponent } from './components/contacts/edit-contact/edit-contact.component';
import { DetailsContactComponent } from './components/contacts/details-contact/details-contact.component';
import { CompanyDetailsComponent } from './components/companies/company-details/company-details.component';
import { EditCompanyComponent } from './components/companies/edit-company/edit-company.component';
import { CreateCompanyComponent } from './components/companies/create-company/create-company.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { CreateParticipantComponent } from './components/participants/create-participant/create-participant.component';
import { DetailsParticipantComponent } from './components/participants/details-participant/details-participant.component';
import { EditParticipantComponent } from './components/participants/edit-participant/edit-participant.component';
import { CreateSessionComponent } from './components/sessions/create-session/create-session.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CreateAccountsComponent } from './components/create-accounts/create-accounts.component';
import { DetailsAccountsComponent } from './components/details-accounts/details-accounts.component';
import { EditAccountsComponent } from './components/edit-accounts/edit-accounts.component';
import { SessionsComponent } from './components/sessions/sessions.component';




const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'templates', component: TemplatesComponent },

  { path: 'errors', component: ErrorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },

  { path: 'participants', component: ParticipantsComponent },
  { path: 'createParticipant', component: CreateParticipantComponent },
  { path: 'participants/:id', component: DetailsParticipantComponent },
  { path: 'participants/edit/:id', component: EditParticipantComponent },

  { path: 'accounts', component: AccountsComponent },
  { path: 'createAccount', component: CreateAccountsComponent },
  { path: 'accounts/:id', component: DetailsAccountsComponent },
  { path: 'accounts/edit/:id', component: EditAccountsComponent },

  { path: 'machines', component: MachinesComponent },
  { path: 'createMachine', component: CreateMachineComponent },
  { path: 'machines/:id', component: DetailsMachineComponent },
  { path: 'machines/edit/:id', component: EditMachineComponent },

  { path: 'events', component: EventsComponent },
  { path: 'createEvent', component: CreateEventComponent },
  { path: 'events/:id', component: DetailsEventComponent },
  { path: 'events/edit/:id', component: EditEventComponent },

  { path: 'sessions', component: SessionsComponent },
  { path: 'sessions/:id', component: DetailsSessionComponent },
  { path: 'sessions/edit/:id', component: EditSessionComponent },
  { path: 'createSession', component: CreateSessionComponent },

  { path: 'users', component: UsersComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'users/:id', component: DetailsUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },

  { path: 'representants', component: ContactsComponent },
  { path: 'createRepresentant', component: CreateContactComponent },
  { path: 'representants/:id', component: DetailsContactComponent },
  { path: 'representants/edit/:id', component: EditContactComponent },

  { path: 'companies', component: CompaniesComponent },
  { path: 'createCompany', component: CreateCompanyComponent },
  { path: 'companies/:id', component: CompanyDetailsComponent },
  { path: 'companies/edit/:id', component: EditCompanyComponent }
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
    EditMachineComponent,
    DetailsMachineComponent,
    DetailsListMachineComponent,
    DetailsCubesMachineComponent,
    DetailsEventComponent,
    EditEventComponent,
    EditSessionComponent,
    DetailsSessionComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DetailsUserComponent,
    CreateContactComponent,
    EditContactComponent,
    DetailsContactComponent,
    CompanyDetailsComponent,
    EditCompanyComponent,
    CreateCompanyComponent,
    ParticipantsComponent,
    CreateParticipantComponent,
    DetailsParticipantComponent,
    EditParticipantComponent,
    CreateSessionComponent,
    AccountsComponent,
    CreateAccountsComponent,
    DetailsAccountsComponent,
    EditAccountsComponent,
    SessionsComponent
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
