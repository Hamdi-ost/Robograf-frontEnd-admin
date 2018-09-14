import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
// import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
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
import { CreateAccountsComponent } from './components/accounts/create-accounts/create-accounts.component';
import { EditAccountsComponent } from './components/accounts/edit-accounts/edit-accounts.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { PhotosComponent } from './components/photos/photos.component';
import { CreatePhotoComponent } from './components/photos/create-photo/create-photo.component';
import { DetailsPhotoComponent } from './components/photos/details-photo/details-photo.component';
import { EditPhotoComponent } from './components/photos/edit-photo/edit-photo.component';
import { TemplateDetailsComponent } from './components/templates/template-details/template-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { CreatePermissionComponent } from './components/permissions/create-permission/create-permission.component';
import { DetailsPermissionComponent } from './components/permissions/details-permission/details-permission.component';
import { EditPermissionComponent } from './components/permissions/edit-permission/edit-permission.component';
import { SearchPipe } from './search.pipe';




const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AfterLoginService] },
  { path: '', component: LoginComponent, canActivate: [BeforeLoginService]  },

  { path: 'templates', component: TemplatesComponent,  canActivate: [AfterLoginService] },
  { path: 'templates/:id', component: TemplateDetailsComponent,  canActivate: [AfterLoginService] },

  { path: 'errors', component: ErrorsComponent, canActivate: [AfterLoginService] },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: 'signup', component: SignupComponent,  canActivate: [BeforeLoginService] },

  { path: 'photos', component: PhotosComponent,  canActivate: [AfterLoginService] },
  { path: 'createPhoto', component: CreatePhotoComponent,  canActivate: [AfterLoginService] },
  { path: 'photos/:id', component: DetailsPhotoComponent,  canActivate: [AfterLoginService] },
  { path: 'photos/edit/:id', component: EditPhotoComponent,  canActivate: [AfterLoginService] },

  { path: 'permissions', component: PermissionsComponent,  canActivate: [AfterLoginService] },
  { path: 'createPermission', component: CreatePermissionComponent,  canActivate: [AfterLoginService] },
  { path: 'permissions/:id', component: DetailsPermissionComponent,  canActivate: [AfterLoginService] },
  { path: 'permissions/edit/:id', component: EditPermissionComponent,  canActivate: [AfterLoginService] },

  { path: 'participants', component: ParticipantsComponent,  canActivate: [AfterLoginService] },
  { path: 'createParticipant', component: CreateParticipantComponent,  canActivate: [AfterLoginService] },
  { path: 'participants/:id', component: DetailsParticipantComponent,  canActivate: [AfterLoginService] },
  { path: 'participants/edit/:id', component: EditParticipantComponent,  canActivate: [AfterLoginService] },

  { path: 'accounts', component: AccountsComponent,  canActivate: [AfterLoginService] },
  { path: 'createAccount', component: CreateAccountsComponent,  canActivate: [AfterLoginService] },
  { path: 'accounts/edit/:id', component: EditAccountsComponent,  canActivate: [AfterLoginService] },

  { path: 'machines', component: MachinesComponent,  canActivate: [AfterLoginService] },
  { path: 'createMachine', component: CreateMachineComponent,  canActivate: [AfterLoginService] },
  { path: 'machines/:id', component: DetailsMachineComponent,  canActivate: [AfterLoginService] },
  { path: 'machines/edit/:id', component: EditMachineComponent,  canActivate: [AfterLoginService] },

  { path: 'events', component: EventsComponent,  canActivate: [AfterLoginService] },
  { path: 'createEvent', component: CreateEventComponent ,  canActivate: [AfterLoginService]},
  { path: 'events/:id', component: DetailsEventComponent,  canActivate: [AfterLoginService] },
  { path: 'events/edit/:id', component: EditEventComponent,  canActivate: [AfterLoginService] },

  { path: 'sessions', component: SessionsComponent,  canActivate: [AfterLoginService] },
  { path: 'sessions/:id', component: DetailsSessionComponent ,  canActivate: [AfterLoginService]},
  { path: 'sessions/edit/:id', component: EditSessionComponent,  canActivate: [AfterLoginService] },
  { path: 'createSession', component: CreateSessionComponent,  canActivate: [AfterLoginService] },

  { path: 'users', component: UsersComponent,  canActivate: [AfterLoginService] },
  { path: 'createUser', component: CreateUserComponent,  canActivate: [AfterLoginService] },
  { path: 'users/:id', component: DetailsUserComponent,  canActivate: [AfterLoginService] },
  { path: 'users/edit/:id', component: EditUserComponent,  canActivate: [AfterLoginService] },

  { path: 'representants', component: ContactsComponent,  canActivate: [AfterLoginService] },
  { path: 'createRepresentant', component: CreateContactComponent,  canActivate: [AfterLoginService] },
  { path: 'representants/:id', component: DetailsContactComponent,  canActivate: [AfterLoginService] },
  { path: 'representants/edit/:id', component: EditContactComponent,  canActivate: [AfterLoginService] },

  { path: 'companies', component: CompaniesComponent,  canActivate: [AfterLoginService] },
  { path: 'createCompany', component: CreateCompanyComponent,  canActivate: [AfterLoginService]},
  { path: 'companies/:id', component: CompanyDetailsComponent,  canActivate: [AfterLoginService] },
  { path: 'companies/edit/:id', component: EditCompanyComponent,  canActivate: [AfterLoginService] }
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
    EditAccountsComponent,
    SessionsComponent,
    PhotosComponent,
    CreatePhotoComponent,
    DetailsPhotoComponent,
    EditPhotoComponent,
    TemplateDetailsComponent,
    SignupComponent,
    PermissionsComponent,
    CreatePermissionComponent,
    DetailsPermissionComponent,
    EditPermissionComponent,
    SearchPipe
  ],
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModalModule.forRoot(),
    FlashMessagesModule.forRoot(),
    FormsModule,
    // CalendarModule.forRoot(),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
