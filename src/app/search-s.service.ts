import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchSService {

  constructor(private http: HttpClient) {
  }

  retrieveInvoicesSearch(phrase, page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/searchInvoice/${phrase}/${page}/${size}`);
  }

  retrieveClientsSearch(phrase, page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/searchClients/${phrase}/${page}/${size}`);
  }

  retrieveExternalClientsSearch(phrase, page, size): Observable<any> {
    return this.http.get(`http://localhost:9090/searchExternal/${phrase}/${page}/${size}`);
  }

  invoiceLength(): Observable<any> {
    return this.http.get(`http://localhost:9090/invoiceLength`, {responseType: 'text'});
  }

  clientLen(): Observable<any> {
    return this.http.get(`http://localhost:9090/clientLen`, {responseType: 'text'});
  }

  externalLen(): Observable<any> {
    return this.http.get(`http://localhost:9090/externalLen`, {responseType: 'text'});
  }
}
