import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGaurdService} from './service/auth-gaurd.service';
import {GenerateDepartmentComponent} from './generate-department/generate-department.component';
import {GenerateEmployeeComponent} from './generate-employee/generate-employee.component';

import {UpdateEmployeeComponent} from './update-employee/update-employee.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {AllEmpDepComponent} from './all-emp-dep/all-emp-dep.component';
import {EmployeeUserComponent} from './employee-user/employee-user.component';
import {HomeComponent} from './home/home.component';
import {EmployeeDeptComponent} from './employee-dept/employee-dept.component';
import {ErrorComponent} from './error/error.component';
import {EmpDeptDetailsComponent} from './emp-dept-details/emp-dept-details.component';
import {AdminAuthService} from './service/admin-auth.service';
import {UserAuthService} from './service/user-auth.service';


const routes: Routes = [
  // for all
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterUserComponent},

  // for admin
  {path: 'addEmployee', component: GenerateEmployeeComponent, canActivate: [AdminAuthService]},
  {path: 'addDepartment', component: GenerateDepartmentComponent, canActivate: [AdminAuthService]},
  {path: 'updateEmpl/:id', component: UpdateEmployeeComponent, canActivate: [AdminAuthService]},
  {path: 'employeeRelations/:id', component: EmpDeptDetailsComponent, canActivate: [AdminAuthService]},
  {path: 'all', component: AllEmpDepComponent, canActivate: [AdminAuthService]},

  //  for users
  {path: 'getUserRoleData', component: EmployeeUserComponent, canActivate: [UserAuthService]},
  {path: 'getMyDepts', component: EmployeeDeptComponent, canActivate: [UserAuthService]},

  // for authenticated
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},

  {path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // , { useHash: true }
  exports: [RouterModule],
  providers: [AdminAuthService, UserAuthService]// , {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class AppRoutingModule {

}
