import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../User/security/auth.service';

@Component({
  selector: 'app-menu-front',
  templateUrl: './menu-front.component.html',
  styles: [
  ]
})
export class MenuFrontComponent implements OnInit {

  isSignedin = false;

  signedinUser: string = '';
  username: any[] = [];

  greeting: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
    this.isSignedin = this.authService.isUserSignedin();
    this.signedinUser = this.authService.getSignedinUser();
    this.username = this.authService.getFirstname();
    console.log(this.username);
   // sessionStorage.getItem('username');

    if (!this.authService.isUserSignedin()) {
      this.router.navigateByUrl('/front/listEvents');
    }

    if (this.isSignedin) {
      //	this.greetingService.getByUserRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/user - You are not authorize'));
      //this.greetingService.getByAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/admin - You are not authorized'));
      //this.greetingService.getByUserOrAdminRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/userOrAdmin - You are not authorized'));
      //this.greetingService.getByAnonymousRole().subscribe((result: string) => this.greeting.push(result), () => console.log('/anonymous - You are not authorized'));
    }
  }

  doSignout() {
    this.authService.signout();
  }

}
