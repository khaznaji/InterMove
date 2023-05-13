 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../model/Complaints/claim.model';
import { TypeClaim } from '../model/Complaints/type-claim';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private BASE_URL = 'http://localhost:8080/InterMove/Claim';


  constructor(private http: HttpClient) { }
  getClaim(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/list`);
  }
  createClaim(events: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL}/add`, events);
  }
  deleteClaim(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/delete/${id}`, { responseType: 'text' });
  }
  updateClaim(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/Claimedit/${id}`, value);
  }
  getClaimId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/getClaimbyid/${id}`);
  }
  private id!: number;

 
  updateComplaint(id: number, status: boolean) {
    return this.http.put(`${this.BASE_URL}/updateComplaintAdmin/${id}?status=${status}`, null);
  }
  updateComplaintStatus() {
    const status = true;
    return this.http.put(`${this.BASE_URL}/updateComplaintAdmin/${this.id}?status=${status}`, null);
  }
  getComplaintsByStatus(status: boolean): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.BASE_URL}/getStatus/${status}`);
  }
  sendEmail(id: number): Observable<string> {
    const url = `${this.BASE_URL}/${id}/send-email`;
    return this.http.post(url, {}, { responseType: 'text' });
  }
  addUserClaim(claim: Claim, id:number): Observable<any> {
    return this.http.post<Claim>(`${this.BASE_URL}/reclamation/${id}` ,claim)
  }
}