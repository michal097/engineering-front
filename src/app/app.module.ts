import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { GenerateDepartmentComponent } from './generate-department/generate-department.component';
import { GenerateEmployeeComponent } from './generate-employee/generate-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AllEmpDepComponent } from './all-emp-dep/all-emp-dep.component';
import { EmployeeUserComponent } from './employee-user/employee-user.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDeptComponent } from './employee-dept/employee-dept.component';
import { ErrorComponent } from './error/error.component';
import { EmpDeptDetailsComponent } from './emp-dept-details/emp-dept-details.component';
import { SortDirective } from './sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    GenerateDepartmentComponent,
    GenerateEmployeeComponent,
    UpdateEmployeeComponent,
    RegisterUserComponent,
    AllEmpDepComponent,
    EmployeeUserComponent,
    HomeComponent,
    EmployeeDeptComponent,
    ErrorComponent,
    EmpDeptDetailsComponent,
    SortDirective
  ],
    imports: [
        BrowserModule,
        AngularMaterialModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
