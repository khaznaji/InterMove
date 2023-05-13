import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../model/Offer/offer.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private BASE_URL = 'http://localhost:8080/InterMove/gestionoffre/retrieve-all-offres';
  private BASE_URL2 = 'http://localhost:8080/InterMove/gestionoffre/add';
  private BASE_URL3= "http://localhost:8080/InterMove/gestionoffre/remove-offre";
  private BASE_URL4= "http://localhost:8080/InterMove/gestionoffre/employees"
  private BASE_URL5="http://localhost:8080/InterMove/gestionoffre/eventId";
  private BASE_URL6="  http://localhost:8080/SpringMVC/gestionoffre/updatesituationaccepted";
  

  private BASE_URL7="http://localhost:8088/SpringMVC/gestionoffre/updatesituationrejected";
  private BASE_URL10="http://localhost:8080/InterMove/gestionoffre/employees1";
  private BASE_URL11="  http://localhost:8080/InterMove/interessant/interesse";
  private BASE_URL12="    http://localhost:8080/InterMove/gestionoffre/export";
  private BASE_URL13="   http://localhost:8080/InterMove/gestionoffre/offers/interesse";

  private BASE_URL14="http://localhost:8080/InterMove/history/history";
  private BASE_URL15="http://localhost:8080/InterMove/gestionoffre/findAlldtoh";
  private BASE_URL16="http://localhost:8080/InterMove/history/history2";




  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL3}/${id}`, { responseType: 'text' });
  }

createOffer(offers: Object): Observable<Object> {
  return this.http.post(`${this.BASE_URL2}`, offers);
}
updateOffer(idoffre: number, value: any): Observable<Object> {
  return this.http.put(`${this.BASE_URL4}/${idoffre}`, value);
}
updateOffer1(idoffre: number, value: any): Observable<Object> {
  return this.http.put(`${this.BASE_URL10}/${idoffre}`, value);
}

getOfferId(idoffre: number): Observable<any> {
  return this.http.get(`${this.BASE_URL5}/${idoffre}`);
}
getall(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }
  setAccepted(idoffre:number){
    return this.http.get(`${this.BASE_URL6}/${idoffre}`);
    
  }

  setRejected(idoffre:number){
    return this.http.get(`${this.BASE_URL7}/${idoffre}`);
  }

  
 
  markOfferAsInteressant(idoffre: number) {
    const url = `${this.BASE_URL11}/${idoffre}`;
    return this.http.put(url, {}).toPromise();
  }

  downloadPDF(id: number) {
    return this.http.get(this.BASE_URL12, { responseType: 'blob' });
  }


  getallinteress
  (): Observable<any> {
    return this.http.get(`${this.BASE_URL13}`);
  }

  markOfferAsHistory(idoffre: number) {
    const url = `${this.BASE_URL14}/${idoffre}`;
    return this.http.put(url, {}).toPromise();
  }
  
  markOfferAsHistory1(idoffre: number): Observable<any> {
    
    return this.http.put(`${this.BASE_URL14}/${idoffre}`, {});

  }
  getallhist(): Observable<any> {
    return this.http.get(`${this.BASE_URL15}`);
  }
  restaurer(idoffre: number) {
    const url = `${this.BASE_URL16}/${idoffre}`;
    return this.http.put(url, {}).toPromise();
  }


}

