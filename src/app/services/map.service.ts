import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getListItems(): Observable<any> {
    return this.http.get(environment.baseUrl);
  }

  getListDetails(listID: string, propertyID: string): Observable<any> {
    const fullUrl = `${environment.detailsUrl}&listID=${listID}&token=${environment.mapToken}&propertyID=${propertyID}`;
    console.log('fullUrl', fullUrl);
    return this.http.get(fullUrl);
  }
}
