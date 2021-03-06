import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createAotUrlResolver} from '@angular/compiler';
import {map} from 'rxjs/operators';

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
    return this.http.get(`http://localhost:9090/getEmployeeById/${id}`);
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

  countAllExternalClients(): Observable<any> {
    return this.http.get(`http://localhost:9090/countAllExternalClients/`, {responseType: 'text'});
  }

  getEmployeesToProject(projectName): Observable<any> {
    return this.http.get(`http://localhost:9090/getEmployeesToProject/${projectName}`);
  }

  addEmpToSpecProj(project, clientId): Observable<any> {
    return this.http.post(`http://localhost:9090/addEmpToSpecProj/${clientId}`, project);
  }

  getAllIssues(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/allIssues/${page}/${size}`);
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

  getAllivoices(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/getAllIvoices/${page}/${size}`);
  }

  getInvoiceById(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getSpecInvoiceById/${id}`);
  }

  makePayment(amount, name, iban, invoiceId): Observable<any> {
    return this.http.get(`http://localhost:9090/pay/${amount}/${name}/${iban}/${invoiceId}`);
  }

  getAllExternalClients(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/allExternals/${page}/${size}`);
  }

  getExternalClient(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getExternal/${id}`);
  }

  getExternalClientInvoices(id): Observable<any> {
    return this.http.get(`http://localhost:9090/getExternalClientInvoices/${id}`);
  }

  archivalInvoices(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/archivalInvoices/${page}/${size}`);
  }

  archivalIssue(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/archivalIssue/${page}/${size}`);
  }

  archivalProjects(page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/archivalProjects/${page}/${size}`);
  }

  getInvoiceSize(): Observable<any> {
    return this.http.get(`http://localhost:9090/getInvoiceSize`, {responseType: 'text'});
  }

  getIssuesSize(): Observable<any> {
    return this.http.get(`http://localhost:9090/getIssuesSize`, {responseType: 'text'});
  }

  getProjectSize(): Observable<any> {
    return this.http.get(`http://localhost:9090/getProjectSize`, {responseType: 'text'});
  }


  getActualUser(): Observable<any> {
    return this.http.get(`http://localhost:9090/getActualUser`, {responseType: 'text'});
  }

  getUsername(): Observable<any> {
    return this.http.get(`http://localhost:9090/getUsername`, {responseType: 'text'});
  }

  getAllExternalsLen(): Observable<any> {
    return this.http.get(`http://localhost:9090/externalSize`, {responseType: 'text'});
  }

  getAllissuesLen(): Observable<any> {
    return this.http.get(`http://localhost:9090/issuesLen`, {responseType: 'text'});
  }

  getInvoicesToPaySize(): Observable<any> {
    return this.http.get(`http://localhost:9090/getInvoicesToPaySize`, {responseType: 'text'});
  }

  deleteEmployeeFromProject(project, client): Observable<any> {
    return this.http.get(`http://localhost:9090/deleteEmployeeFromProject/${project}/${client}`);
  }

  generateReport(from, to): Observable<Blob> {
    return this.http.get(`http://localhost:9090/getReport/${from}/${to}`, {responseType: 'blob'});
  }

  chatMess(message): Observable<any> {
    return this.http.get(`http://localhost:9090/chat/${message}`, {responseType: 'text'});
  }
  chatMessToPersonal(username, message): Observable<any> {
    return this.http.get(`http://localhost:9090/chat/${username}/${message}`);
  }

  getMessages(): Observable<any> {
    return this.http.get(`http://localhost:9090/getChat`);
  }

  getSpecChat(targetUser): Observable<any> {
    return this.http.get(`http://localhost:9090/getSpecChat/${targetUser}`);
  }

  getMyChats(actialUser): Observable<any> {
    return this.http.get(`http://localhost:9090/getMyChats/${actialUser}`);
  }
  getAvailableChats(): Observable<any> {
    return this.http.get(`http://localhost:9090/getAvailableChats/`);
  }
  startChatting(targetuser): Observable<any> {
    return this.http.get(`http://localhost:9090/startChatting/${targetuser}`, {responseType: 'text'});
  }
  getChatCounter(chatID, sendFrom): Observable<any> {
    return this.http.get(`http://localhost:9090/getChatCounter/${chatID}/${sendFrom}`);

  }
  markAsRead(chatID, sendFrom): Observable<any> {
    return this.http.get(`http://localhost:9090/markAsRead/${chatID}/${sendFrom}`);

  }
}
