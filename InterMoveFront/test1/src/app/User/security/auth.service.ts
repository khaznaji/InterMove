import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	private baseUrl = 'http://localhost:8080/InterMove/';
	isLoggedIn = false;
	 tokenExpirationTime = 5000; // 5 seconds
     expirationTimestamp = Date.now() + this.tokenExpirationTime;


	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

	signin(email: any,password: any): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signin', {email,password}, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((resp) => {
			sessionStorage.setItem("email",resp.email)
          sessionStorage.setItem("token",`Bearer ${resp.token}`)

		  this.setFirstname(resp.user.firstname)
			return resp;
		}));
		this.isLoggedIn = true;
	}

	signup(request: Request): Observable<any> {
		return this.http.post<any>(this.baseUrl + 'signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((resp) => {                                                         
			return resp;
		}));
	}


	
	userActive(email: any,password: any): Observable<any>{
		return this.http.post<any>(`${this.baseUrl}active`,{email,password}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }


	activeAccount(mail: any,code: any):Observable<any>{
		return this.http.post<any>(`${this.baseUrl}activated`,{mail,code}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }
	
	  checkEmail(email: any):Observable<any>{
		return this.http.post<any>(`${this.baseUrl}checkEmail`,{email}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }
	
	  resetPassword(email: any,code: any,password: any):Observable<any>{
		return this.http.post<any>(`${this.baseUrl}resetPassword`,{email,code,password}).pipe(
		  map(
			response => {
			  return response;
			}
		  )
		)
	  }

	signout() {
		sessionStorage.removeItem('email');
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('firstname');

		this.router.navigateByUrl('front');
	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
		
	}

	getSignedinUser() {
		return sessionStorage.getItem('user') as string;
		
	}
	getSignInPhoneNumber() {
		return sessionStorage.getItem('phone_number') as string;
		
	}
	isLogin(){
		return !(sessionStorage.getItem('email') == null ||
			   sessionStorage.getItem('token') == null);
	  }
	getToken() {
		let token = sessionStorage.getItem('token') as string;
		return token;
	}
	public setFirstname(firstname: string) {
		sessionStorage.setItem('firstname', JSON.stringify(firstname));
	}

	public getFirstname(): [] {
		const firstname = sessionStorage.getItem('firstname');
		if (firstname !== null) {
			return JSON.parse(firstname);
		}
		return [];
	}

}