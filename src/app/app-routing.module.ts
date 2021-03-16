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
import {AdminAndUserAuthService} from './admin-and-user-auth.service';
import {AdminKibanaDashboardComponent} from './admin-kibana-dashboard/admin-kibana-dashboard.component';
import {SearchControllerComponent} from './search-controller/search-controller.component';
import {ClientComponent} from "./client/client.component";
import {ErrorComponent} from "./error/error.component";
import {ProjectComponent} from "./project/project.component";
import {IssueComponent} from "./issue/issue.component";
import {AllClientsComponent} from "./all-clients/all-clients.component";
import {ProjectListComponent} from "./project-list/project-list.component";
import {GetProjectComponent} from "./get-project/get-project.component";
import {AllIssueComponent} from "./all-issue/all-issue.component";
import {GetIssueComponent} from "./get-issue/get-issue.component";
import {PaymentsComponent} from "./payments/payments.component";
import {PayInvoiceComponent} from "./pay-invoice/pay-invoice.component";
import {ExternalClientComponent} from "./external-client/external-client.component";
import {ArchivalDataComponent} from "./archival-data/archival-data.component";


const routes: Routes = [
  // for all
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},


  // for admin
  //TO JEST ZJEBANE, ADMIN JEST ZAMIENIONY Z USEREM!!!!!!!!!!!!!!!
  //UWAGA !!!!!
  //ZJEBANEEEEE TUUUU JEEEEEST

  //EDIT POTENCJALNIE JEST OK
  {path: 'addEmployee', component: GenerateEmployeeComponent, canActivate: [AdminAuthService]},
  {path: 'addInvoice', component: InvoiceComponent, canActivate: [AdminAndUserAuthService]},
  {path: 'dashboard', component: AdminKibanaDashboardComponent, canActivate: [AdminAuthService]},
  {path: 'search', component: SearchControllerComponent, canActivate: [AdminAndUserAuthService]},
  {path: 'emplyeeDetails/:id', component: ClientComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'issue', component: IssueComponent},
  {path: 'allClients', component: AllClientsComponent},
  {path: 'allProjects', component: ProjectListComponent},
  {path: 'project/:projectName', component: GetProjectComponent},
  {path: 'allIssues', component: AllIssueComponent},
  {path: 'issue/:id', component: GetIssueComponent},
  {path: 'payment', component: PaymentsComponent},
  {path: 'invoice/:id', component: PayInvoiceComponent},
  {path: 'external/:id', component: ExternalClientComponent},
  {path: 'archival', component: ArchivalDataComponent},
  //  for users
  // {path: 'getUserRoleData', component: EmployeeUserComponent, canActivate: [UserAuthService]},

  // for authenticated
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},

  {path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminAuthService, UserAuthService]
})
export class AppRoutingModule {

}
