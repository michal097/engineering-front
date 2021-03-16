import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {
  }

  register(user): Observable<any> {
    return this.http.post(`http://localhost:9090/createAndSaveUser`, user);
  }

  auth(): Observable<any> {
    return this.http.get(`http://localhost:9090/test`, {responseType: 'text'});
  }

  getUserNameAndSurname(): Observable<any> {
    return this.http.get(`http://localhost:9090/userName`, {responseType: 'text'});
  }

  upload(file): Observable<any> {


    const formData = new FormData();


    formData.append('file', file, file.name);

    return this.http.post(`http://localhost:9090/uploadFile`, formData);
  }

  saveEmployee(employee): Observable<any> {
    return this.http.post(`http://localhost:9090/createUser`, employee);
  }

  getInvoiceData(): Observable<any> {
    return this.http.get(`http://localhost:9090/inv`);
  }

  saveInvClient(invoice): Observable<any> {
    return this.http.post(`http://localhost:9090/saveInvInClient`, invoice);
  }

  retrieveSpecyficUserData(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getEmployee/${id}`);
  }

  enterNewProject(project): Observable<any> {
    return this.http.post(`http://localhost:9090/addProj`, project);
  }

  addIssue(issue): Observable<any> {
    return this.http.post(`http://localhost:9090/addIssue`, issue);
  }

  retrieveAllClients(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/listAllEmployees/${page}/${size}`);
  }

  allEmpLen() {
    return this.http.get(`http://localhost:9090/allEmpLength`, {responseType: 'text'});
  }

  retrieveProjectsForSpecyficUser(userId): Observable<any> {
    return this.http.get(`http://localhost:9090/employeeProjects/${userId}`);
  }

  updateClientData(clientId, client): Observable<any> {
    return this.http.put(`http://localhost:9090/updateEmployee/${clientId}`, client);
  }

  deleteClientById(clientId): Observable<any> {
    return this.http.delete(`http://localhost:9090/deleteEmployee/${clientId}`);
  }

  displayProjectsList(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/listProjects/${page}/${size}`);
  }

  allProjsLen() {
    return this.http.get(`http://localhost:9090/listProjectsLength`, {responseType: 'text'});
  }

  getSpecProject(projectName): Observable<any> {
    return this.http.get(`http://localhost:9090/project/${projectName}`);
  }

  endProject(projectName, project): Observable<any> {
    return this.http.post(`http://localhost:9090/endOfProject/${projectName}`, project);
  }

  getClientInvoices(clientId): Observable<any> {
    return this.http.get(`http://localhost:9090/clientInvoices/${clientId}`);
  }

  findInvoiceByNumber(invoiceNumber): Observable<any> {
    return this.http.get(`http://localhost:9090/findInvoiceByNumber/${invoiceNumber}`, {responseType: 'text'});
  }

  getEmployeesToProject(projectName): Observable<any> {
    return this.http.get(`http://localhost:9090/getEmployeesToProject/${projectName}`);
  }

  addEmpToSpecProj(project, clientId): Observable<any> {
    return this.http.post(`http://localhost:9090/addEmpToSpecProj/${clientId}`, project);
  }

  getAllIssues(): Observable<any> {
    return this.http.get(`http://localhost:9090/allIssues`);
  }

  getSpecIssue(issueID): Observable<any> {
    return this.http.get(`http://localhost:9090/getIssue/${issueID}`);
  }

  makeWorkInProgress(issue): Observable<any> {
    return this.http.post(`http://localhost:9090/makeWorkInProgress`, issue);
  }

  saveIssueSolution(issue): Observable<any> {
    return this.http.post(`http://localhost:9090/saveIssueSolution`, issue);
  }

  getAllivoices(): Observable<any> {
    return this.http.get(`http://localhost:9090/getAllIvoices`);
  }

  getInvoiceById(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getSpecInvoiceById/${id}`);
  }

  makePayment(invoice): Observable<any> {
    return this.http.post(`http://localhost:9090/makePayment`, invoice);
  }

  getAllExternalClients(): Observable<any> {
    return this.http.get(`http://localhost:9090/allExternals`);
  }

  getExternalClient(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getExternal/${id}`);
  }

  getExternalClientInvoices(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getExternalClientInvoices/${id}`);
  }

  archivalInvoices(): Observable<any> {
    return this.http.get(`http://localhost:9090/archivalInvoices`);
  }

  archivalIssue(): Observable<any> {
    return this.http.get(`http://localhost:9090/archivalIssue`);
  }

  archivalProjects(): Observable<any> {
    return this.http.get(`http://localhost:9090/archivalProjects`);
  }

}
