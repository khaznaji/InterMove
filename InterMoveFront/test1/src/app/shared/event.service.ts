
import { ModaliteEvent } from '../model/Event/modalite-event';
import { TypeEvent } from '../model/Event/type-event';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private BASE_URL = 'http://localhost:8080/InterMove/Events/list';
  private BASE_URL2 = 'http://localhost:8080/InterMove/Events/add';
  private BASE_URL3= "http://localhost:8080/InterMove/Events/delete"; 
  private BASE_URL4="http://localhost:8080/InterMove/Events/employees";
  private BASE_URL5="http://localhost:8080/InterMove/Events/eventId";
  private BASE_URL6="http://localhost:8080/InterMove/Events"; 
  private BASE_URL7="http://localhost:8080/InterMove/Events/addEvent"; 


  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }

deleteEvent(id: number): Observable<any> {
  return this.http.delete(`${this.BASE_URL3}/${id}`, { responseType: 'text' });
}
createEvent(events: Object): Observable<Object> {
  return this.http.post(`${this.BASE_URL2}`, events);
}

updateEvent(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.BASE_URL4}/${id}`, value);
}
getEventId(id: number): Observable<any> {
  return this.http.get(`${this.BASE_URL5}/${id}`);
}

affecterUserToEvent(id: number, idE: number): Observable<any> {
  return this.http.post(`${this.BASE_URL6}/affecter-user-event/${id}/${idE}`, {});
}
RemoveUserToEvent(id: number, idE: number): Observable<any> {
  return this.http.delete(`${this.BASE_URL6}/remove-user-event/${id}/${idE}`, {});
}

saveEvents(formData: FormData) {
  return this.http.post(`${this.BASE_URL7}`, formData);
}
getEventById(id: number): Observable<Event> {
  return this.http.get<Event>(`${this.BASE_URL6}/eventId/${id}`);
}

}