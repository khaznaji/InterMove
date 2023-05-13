import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private BASE_URL = 'http://localhost:8080/InterMove/tag/retrieve-all-offres';
  private BASE_URL2 = 'http://localhost:8080/InterMove/tag/add';
  private BASE_URL3= "http://localhost:8080/InterMove/tag/remove-offre";
  private BASE_URL4= "http://localhost:8080/InterMove/tag/employees"
  private BASE_URL5="http://localhost:8080/InterMove/tag/eventId";

  constructor(private http: HttpClient) { }

  getTags(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL3}/${id}`, { responseType: 'text' });
  }  
  createOffer(tags: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL2}`, tags);
  }
  updateOffer(idTags: number, value: any): Observable<Object> {
    return this.http.put(`${this.BASE_URL4}/${idTags}`, value);
  }
/*   getEventId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL5}/${id}`);
  } */
  getOfferId(idTags: number): Observable<any> {
    return this.http.get(`${this.BASE_URL5}/${idTags}`);
  }
}
