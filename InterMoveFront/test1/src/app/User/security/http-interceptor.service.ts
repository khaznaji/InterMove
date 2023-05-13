import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
 
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
 
    constructor(private authService: AuthService) { }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isUserSignedin() && this.authService.getToken()) {
            const request = req.clone({
                headers: new HttpHeaders({
                    'Authorization': this.authService.getToken()
                })
            });
            return next.handle(request).pipe(
				catchError(err => {
					if(err instanceof HttpErrorResponse && err.status === 401) {
						this.authService.signout();
					}
					return throwError(err);
				})
			);
        }
       
		return next.handle(req);
    }

}