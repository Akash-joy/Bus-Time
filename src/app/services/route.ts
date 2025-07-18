import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable()
export class Route {
  private readonly apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRlNWJmNmQ1MGJmYjQwNmRhMWY4M2I2ZGI4YzcwMWUwIiwiaCI6Im11cm11cjY0In0=';

  constructor(private http: HttpClient) {}

  getRoutePath(coordinates: number[][]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.apiKey,
      'Content-Type': 'application/json'
    });

    const body = {
      coordinates: coordinates
    };
    return this.http.post<any>(environment.mapUrl, body, { headers });
  }
}
