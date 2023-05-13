import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { QrCode } from '../model/QrCode/qrcode.model';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {
  private baseUrl = ' http://localhost:8080/InterMove/Events'; // Change this to match your API endpoint
  
  constructor(private http: HttpClient) { }

  createQRCode(link: string): Observable<QrCode> {
    return this.http.post<QrCode>(`${this.baseUrl}`, link);
  }

  getQRCodeImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'blob' });
  }
}
