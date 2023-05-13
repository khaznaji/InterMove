import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { candidacy } from '../models/candidacy';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {

  constructor(private _http:HttpClient) { }

  getall():Observable<candidacy[]>{
    return this._http.get<candidacy[]>(environment.apiUrl+"/InterMove/candidacy/all");
  }

  getbyId(idE:number):Observable<candidacy>{
    console.log(idE)
    return this._http.get<candidacy>(environment.apiUrl+"/InterMove/candidacy/"+idE);
  }

  getbyUserId(idU:number):Observable<candidacy[]>{
    console.log(idU)
    return this._http.get<candidacy[]>(environment.apiUrl+"/InterMove/candidacy/userId/"+idU);
  }

  setAccepted(idE:number){
    console.log(idE)
    return this._http.put(environment.apiUrl+"/InterMove/candidacy/updatesituationaccepted/"+idE,{});
  }

  setRejected(idE:number){
    console.log(idE)
    return this._http.put(environment.apiUrl+"/InterMove/candidacy/updatesituationrejected/"+idE,{});
  }

  add(candidacy:any){
    return this._http.post<candidacy>(environment.apiUrl+"/InterMove/candidacy/create",candidacy);

  }
 
  getUserById()
  {
    return environment.currentuser;
  }


  score(){
    return this._http.post<candidacy>(environment.apiUrl+"/InterMove/convert",candidacy);

  }
  testpdf(idc:number){

    return this._http.post<any>(environment.apiUrl+"/InterMove/convertt/"+idc,{});
  }
 
  convertPdfToText(file: File, idc: number): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('idc', idc.toString());
  
    return this._http.post<number>(environment.apiUrl+"/InterMove/convert", formData);
  }

  convertPdfToTextBobo( idc: number): Observable<number> {

    return this._http.get<number>(environment.apiUrl+"/InterMove/converttofile/"+idc);
  }

  sendmail(idE:number){
   console.log(idE)
    let temp={
      "to": "karoui.maziz@gmail.com",
      "subject": "Test Email",
      "body": ""
  }
  

    return this._http.post<any>(environment.apiUrl+"/InterMove/email/send/"+idE,temp);

  }

  assignDocumentToCandidacy(candidacyId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('candidacyId', candidacyId.toString());
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this._http.post<any>(environment.apiUrl+"/InterMove/documents/assign", formData);
  }
}
 