import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Route {
    private readonly apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    private readonly apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRlNWJmNmQ1MGJmYjQwNmRhMWY4M2I2ZGI4YzcwMWUwIiwiaCI6Im11cm11cjY0In0=';


  constructor(private http: HttpClient) { }

  getRoutePath(coordinates: number[][]): Observable<any> {
     const headers = new HttpHeaders({
      Authorization: this.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      coordinates: coordinates
    };
    return this.http.post<any>(this.apiUrl,body,{ headers });
  }
}
