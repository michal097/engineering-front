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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'addEmployee', component: GenerateEmployeeComponent},
  {path: 'addDepartment', component: GenerateDepartmentComponent},
  {path: 'updateEmpl/:id', component: UpdateEmployeeComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'all', component: AllEmpDepComponent},
  {path: 'getUserRoleData', component: EmployeeUserComponent},
  {path: 'getMyDepts', component: EmployeeDeptComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]},
  {path: 'employeeRelations/:id', component: EmpDeptDetailsComponent},
  {path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
