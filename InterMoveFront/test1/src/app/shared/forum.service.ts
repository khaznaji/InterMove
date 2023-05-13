import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User/user";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private BASE_URL = 'http://localhost:8080/InterMove/posts';
  private BASE_URL2 = 'http://localhost:8080/InterMove/comments';
  private BASE_URL3 = 'http://localhost:8080/InterMove/messages';


  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, { responseType: 'text' });
  }
  createPost(Posts: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL}`, Posts);
  }

  updatePost(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.BASE_URL}/${id}`, value);
  }
  getPostId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`);
  }

  getComments(): Observable<any> {
    return this.http.get(`${this.BASE_URL2}`);
  }
  getCommentsPost(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/posts/${id}`);
  }
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL2}/${id}`, { responseType: 'text' });
  }
  createComment(Comments: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL2}`, Comments);
  }

  updateComment(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.BASE_URL2}/${id}`, value);
  }
  getCommentId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL2}/${id}`);
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.BASE_URL3}`);
  }

  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL3}/${id}`, { responseType: 'text' });
  }
  createMessage(Messages: Object): Observable<Object> {
    return this.http.post(`${this.BASE_URL3}`, Messages);
  }
  updateMessage(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.BASE_URL3}/${id}`, value);
  }
  getMessageId(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL3}/${id}`);
  }
  getChatterList(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL3}/test/${id}`);
  }
  getConverstation(id1: number,id2:number): Observable<any> {
    return this.http.get(`${this.BASE_URL3}/conversation?user1=${id1}&user2=${id2}`);
  }
  deleteConverstation(id1: number,id2:number): Observable<any> {
    return this.http.delete(`${this.BASE_URL3}/conversation?user1Id=${id1}&user2Id=${id2}`);
  }

}
