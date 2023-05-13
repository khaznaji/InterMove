import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { courses } from '../models/courses';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tag } from '../model/Tag/tag.module';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
tagName:string="angular";

  constructor(private _http:HttpClient) { }

  getall():Observable<courses[]>{
    return this._http.get<courses[]>(environment.apiUrl+"/InterMove/course/");
  }

  gettagName(tag:string):Observable<courses[]>{
    return this._http.get<courses[]>(environment.apiUrl+`/InterMove/course/getbytag/${tag}`,{});
  }

  addcourse(course:courses){
    console.log(course)
    return this._http.post<courses>(environment.apiUrl+`/InterMove/course/create`,course);
  }

  getid(id:number):Observable<courses>{
    return this._http.get<courses>(environment.apiUrl+`/InterMove/course/${id}`);
  }

  delete(id:number):Observable<courses>{
    return this._http.delete<courses>(environment.apiUrl+`/InterMove/course/delete/${id}`);
  }

  getUdemyCourses(id:string):Observable<any[]>{
    return this._http.get<any[]>(`https://www.udemy.com/api-2.0/courses/${id}`);
  }
  getdocument(idc:number):Observable<any[]>{
    return this._http.get<any[]>(environment.apiUrl+`/InterMove/documents/${idc}/download`);
  }

  getTags():Observable<Tag[]>{
    return this._http.get<Tag[]>(environment.apiUrl+`/InterMove/tag`);
  }

  addTags(tags:Tag){
    console.log(tags)
    return this._http.post<Tag>(environment.apiUrl+`/InterMove/tag`,tags);
  }
  

  assignTagsToCourse(id:number,tags:Number[]){
      console.log(tags)
      return this._http.post<Tag>(environment.apiUrl+`/InterMove/tag/courses/${id}/tags`,tags);
    }
    assignTagsToOffre(id:number,tags:Number[]){
      console.log(tags)
      return this._http.post<Tag>(environment.apiUrl+`/InterMove/tag/offers/${id}/tags`,tags);
    }
  downloadPdf(idc:number) {
    this._http.get(environment.apiUrl+`/InterMove/documents/${idc}/download`, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  getDocumentBlob(idc: number): Observable<Blob> {
    return this._http.get(environment.apiUrl + `/InterMove/documents/${idc}/download`, { responseType: 'blob' })
      .pipe(
        map(response => response as Blob)
      );
}

getDocumentFile(idc: number): Observable<File> {
  return this._http.get(environment.apiUrl + `/InterMove/documents/${idc}/download`, { responseType: 'blob' })
    .pipe(
      map(response => {
        const file = new File([response], 'document.pdf', { type: 'application/pdf' });
        return file;
      })
    );
}

getoffretags(idO:number):Observable<Tag[]>{
  return this._http.get<Tag[]>(environment.apiUrl+`/InterMove/gestionoffre/offretags/${idO}`);
}
}