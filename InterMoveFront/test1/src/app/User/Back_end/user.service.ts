import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Request } from './add-user/request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  API = 'http://localhost:8080/InterMove';


  public registerUser(UserData: any) {
    return this.http.post(this.API + '/signup', UserData);
  }

  public getUsers() {
    return this.http.get(this.API + '/retrieve-all-users');
  }

  public deleteUsers(id: any) {
    return this.http.delete(this.API + '/remove-user?id=' + id);
  }

  public updateStudents(user: any) {
    return this.http.put(this.API + '/updateUser', user);
  }
  signup(request: Request): Observable<any> {
		return this.http.post<any>(this.API + '/signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {                                                         
			return resp;
		}));
	}
}