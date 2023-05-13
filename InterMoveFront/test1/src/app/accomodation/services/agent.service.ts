import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent.model';

const baseUrl = 'http://localhost:8080/InterMove/Agents/';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Agent[]> {
    return this.http.get<Agent[]>(baseUrl+"AllAgents");
  }

  get(id: any): Observable<Agent> {
    return this.http.get<Agent>(`${baseUrl}getAgentById/${id}`);
  }

  create(data: any,id: any): Observable<any> {
    return this.http.post(`${baseUrl}addAgent/${id}`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}updateAgent`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}deleteAgent/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+"deleteAll");
  }

  findByTitle(name: any): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${baseUrl}getAgencyByName/${name}`);
  }
}
