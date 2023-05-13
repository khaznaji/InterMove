import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../models/house.model';
import * as countrycitystatejson from 'countrycitystatejson';

const baseUrl = 'http://localhost:8080/InterMove/Houses/';
@Injectable({
  providedIn: 'root'
})
export class HousesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<House[]> {
    return this.http.get<House[]>(baseUrl+"AllHouses");
  }

  get(id: any): Observable<House> {
    return this.http.get<House>(`${baseUrl}getHouseById/${id}`);
  }

  create(data: any,id: any): Observable<any> {
    return this.http.post(`${baseUrl}addHouse/${id}`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}updateHouse`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}deleteHouse/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+"deleteAll");
  }

  findByTitle(name: any): Observable<House[]> {
    return this.http.get<House[]>(`${baseUrl}SearchHouse/${name}`);
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
