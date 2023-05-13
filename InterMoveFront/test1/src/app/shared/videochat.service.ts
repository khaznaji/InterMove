import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideochatService {
  private baseUrl = 'http://localhost:8080/InterMove/Events/videochat2'; // URL de base de l'API

  constructor(private http: HttpClient) {}

  getVideochatPage(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
