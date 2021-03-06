import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchSService {

  constructor(private http: HttpClient) {
  }

  retrieveInvoicesSearch(phrase): Observable<any> {
    return this.http.get(`http://localhost:9090/searchInvoice/${phrase}`);
  }
  retrieveClientsSearch(phrase): Observable<any> {
    return this.http.get(`http://localhost:9090/searchClients/${phrase}`);
  }
  retrieveExternalClientsSearch(phrase): Observable<any> {
    return this.http.get(`http://localhost:9090/searchExternal/${phrase}`);
  }
}
