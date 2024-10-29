import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://wag10.bowlab.net/api';
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // หรือแหล่งที่เก็บโทเค็นอื่น
    if (!token) {
      throw new Error('Token not found'); // ถ้าตรวจไม่พบโทเค็นให้ throw error
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  constructor(private http: HttpClient) {}

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { email, password });
  // }
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (!response.token || !response.role) {
            throw new Error('API response does not contain token or role');
          }
        })
      );
  }

  getUserProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user/profile`, { headers });
  }

  Allusers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
  // login(email: string, password: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(`${this.apiUrl}/login`, { email, password }, { headers });
  // }

  //Event
  getEvent(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }

  addEvent(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/events`, data);
  }

  updateEvent(event_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/events/${event_id}`, data, {
      headers: this.getHeaders(),
    });
  }

  //Zone
  getZone(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/zones`);
  }

  addZone(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/zones`, data);
  }

  updateZone(zone_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/zones/${zone_id}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteZone(zone_name: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/zones/${zone_name}`);
  }

  //Booth
  getBooth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/booths`);
  }

  addBooth(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/booths`, data);
  }

  updateBooth(booth_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/booths/${booth_id}`, data, {
      headers: this.getHeaders(),
    });
  }

  deleteBooth(booth_name: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/booths/${booth_name}`);
  }
}
