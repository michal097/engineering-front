import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGaurdService} from './service/auth-gaurd.service';
import {GenerateEmployeeComponent} from './generate-employee/generate-employee.component';

import {HomeComponent} from './home/home.component';

import {AdminAuthService} from './service/admin-auth.service';
import {UserAuthService} from './service/user-auth.service';
import {InvoiceComponent} from './invoice/invoice.component';
import {AdminKibanaDashboardComponent} from './admin-kibana-dashboard/admin-kibana-dashboard.component';
import {SearchControllerComponent} from './search-controller/search-controller.component';
import {ClientComponent} from './client/client.component';
import {ErrorComponent} from './error/error.component';
import {ProjectComponent} from './project/project.component';
import {IssueComponent} from './issue/issue.component';
import {AllClientsComponent} from './all-clients/all-clients.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {GetProjectComponent} from './get-project/get-project.component';
import {AllIssueComponent} from './all-issue/all-issue.component';
import {GetIssueComponent} from './get-issue/get-issue.component';
import {PaymentsComponent} from './payments/payments.component';
import {PayInvoiceComponent} from './pay-invoice/pay-invoice.component';
import {ExternalClientComponent} from './external-client/external-client.component';
import {ArchivalDataComponent} from './archival-data/archival-data.component';
import {AdminAndModeratorAuthService} from './admin-and-moderator-auth.service';
import {ModeratorAndUserAuthService} from './moderator-and-user-auth.service';


const routes: Routes = [

  // for logged in users
  {path: 'addInvoice', component: InvoiceComponent, canActivate: [AuthGaurdService]},
  {path: 'emplyeeDetails/:id', component: ClientComponent, canActivate: [AuthGaurdService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},

  // admin and moderator
  {path: 'addEmployee', component: GenerateEmployeeComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'search', component: SearchControllerComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'project', component: ProjectComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'allClients', component: AllClientsComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'allProjects', component: ProjectListComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'project/:projectName', component: GetProjectComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'invoice/:id', component: PayInvoiceComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'external/:id', component: ExternalClientComponent, canActivate: [AdminAndModeratorAuthService]},
  {path: 'archival', component: ArchivalDataComponent, canActivate: [AdminAndModeratorAuthService]},

  // moderator and user
  {path: 'issue', component: IssueComponent, canActivate: [ModeratorAndUserAuthService]},
  {path: 'allIssues', component: AllIssueComponent, canActivate: [ModeratorAndUserAuthService]},
  {path: 'issue/:id', component: GetIssueComponent, canActivate: [ModeratorAndUserAuthService]},

  // only admin
  {path: 'dashboard', component: AdminKibanaDashboardComponent, canActivate: [AdminAuthService]},
  {path: 'payment', component: PaymentsComponent, canActivate: [AdminAuthService]},

  // available without auth
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminAuthService, UserAuthService]
})
export class AppRoutingModule {

}
