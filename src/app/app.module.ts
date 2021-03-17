import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AngularMaterialModule} from './angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BasicAuthHtppInterceptorService} from './service/basic-auth-interceptor.service';
import {GenerateEmployeeComponent} from './generate-employee/generate-employee.component';
import {HomeComponent} from './home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {InvoiceComponent} from './invoice/invoice.component';
import {AdminKibanaDashboardComponent} from './admin-kibana-dashboard/admin-kibana-dashboard.component';
import {NgMatSearchBarModule} from 'ng-mat-search-bar';
import {SearchControllerComponent} from './search-controller/search-controller.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ErrorComponent} from './error/error.component';
import {ProjectComponent} from './project/project.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {IssueComponent, SafeHtmlPipeline} from './issue/issue.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {AllClientsComponent} from './all-clients/all-clients.component';
import {ClientComponent} from './client/client.component';
import {ClientDialogComponent} from './client/client-dialog/client-dialog.component';
import {DeleteClientDialogComponent} from './client/delete-client-dialog/delete-client-dialog.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {GetProjectComponent} from './get-project/get-project.component';
import {EndProjectComponent} from './get-project/end-project/end-project.component';
import {ClientInvoiceComponent} from './client/client-invoice/client-invoice.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AssignEmpComponent} from './get-project/assign-emp/assign-emp.component';
import {AllIssueComponent} from './all-issue/all-issue.component';
import {GetIssueComponent, SafeHtmlPipe} from './get-issue/get-issue.component';
import {HolidayProposalComponent} from './holiday-proposal/holiday-proposal.component';
import {PaymentsComponent} from './payments/payments.component';
import {PayInvoiceComponent} from './pay-invoice/pay-invoice.component';
import {InvoicePreviewComponent} from './pay-invoice/invoice-preview/invoice-preview.component';
import {MakePaymentComponent} from './pay-invoice/make-payment/make-payment.component';
import {ExternalClientComponent} from './external-client/external-client.component';
import {ArchivalDataComponent} from './archival-data/archival-data.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    GenerateEmployeeComponent,
    HomeComponent,
    InvoiceComponent,
    ClientComponent,
    AdminKibanaDashboardComponent,
    SearchControllerComponent,
    ErrorComponent,
    ProjectComponent,
    IssueComponent,
    AllClientsComponent,
    ClientDialogComponent,
    DeleteClientDialogComponent,
    ProjectListComponent,
    GetProjectComponent,
    EndProjectComponent,
    ClientInvoiceComponent,
    AssignEmpComponent,
    AllIssueComponent,
    GetIssueComponent,
    SafeHtmlPipe,
    SafeHtmlPipeline,
    HolidayProposalComponent,
    PaymentsComponent,
    PayInvoiceComponent,
    InvoicePreviewComponent,
    MakePaymentComponent,
    ExternalClientComponent,
    ArchivalDataComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgMatSearchBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    BrowserModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthHtppInterceptorService,
    multi: true
  }, {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents: [ClientDialogComponent,
    MakePaymentComponent,
    DeleteClientDialogComponent,
    EndProjectComponent,
    ClientInvoiceComponent,
    AssignEmpComponent,
    InvoicePreviewComponent]
})
export class AppModule {
}
