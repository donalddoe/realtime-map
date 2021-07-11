import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MapService {


httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {}

  getListItems(): Observable<any> {
    return this.http.get(environment.baseUrl)
  };

  getListDetails(): Observable<any> {
return this.http.get(environment.detailsUrl)
  }



}
