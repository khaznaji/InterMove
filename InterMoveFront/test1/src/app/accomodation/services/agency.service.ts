import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from '../models/agency.model';
import * as countrycitystatejson from 'countrycitystatejson';
import { Agent } from '../models/agent.model';

const baseUrl = 'http://localhost:8080/InterMove/Agencies/';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Agency[]> {
    return this.http.get<Agency[]>(baseUrl+"AllAgencies");
  }
  getAgents(AgencyName:any): Observable<Agent[]> {
    return this.http.get<Agency[]>(`${baseUrl}getAgents/${AgencyName}`);
  }

  get(id: any): Observable<Agency> {
    return this.http.get<Agency>(`${baseUrl}getAgencyById/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl+"addAgency", data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}updateAgency`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}deleteAgency/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+"deleteAll");
  }

  findByTitle(name: any): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${baseUrl}getAgencyByName/${name}`);
  }
  //Country selector
  private countryData = countrycitystatejson;

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShotName: string) {
    return this.countryData.getStatesByShort(countryShotName);
  }
  getCitiesByState(country: string, state: string) {
    return this.countryData.getCities(country, state);
  }
}