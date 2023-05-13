import { Component, OnInit } from '@angular/core';
import { Request } from './request';
import { UserService } from '../../Back_end/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  User = {
    password: '',
    firstname: '',
    lastname: '',
    cin: '',
    email: '',
    phone: '',
    address: ''

  }
  ngOnInit(): void {
  }


  userDetails = null as any;

  constructor(private userService: UserService, private router: Router) {
  }
  register(registerForm: NgForm) {
    this.userService.registerUser(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doSignup() {
    if (this.User.firstname !== '' && this.User.firstname !== null && this.User.password !== '' && this.User.password !== null) {
      const request: Request = {
        firstname: this.User.firstname, password: this.User.password,
        lastname: this.User.lastname,
        email: this.User.email,
        phone: this.User.phone,
        address: this.User.address
      };

      this.userService.signup(request).subscribe((result) => {
        //console.log(result);
        //this.success = 'Signup successful';
        this.router.navigateByUrl('login');

      }, (err) => {
        //console.log(err);

      });

    }
  }
}
