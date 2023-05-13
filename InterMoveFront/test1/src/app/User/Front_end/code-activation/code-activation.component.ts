import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-code-activation',
  templateUrl: './code-activation.component.html',
  styleUrls: ['./code-activation.component.css']
})
export class CodeActivationComponent implements OnInit {

  email: string = "";

  checkoutParentGroup!: FormGroup;
  constructor(private formChildGroup: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    const emailActive = sessionStorage.getItem("emailActive");
    if (emailActive !== null) {
      this.email = emailActive;
    }
    this.myFormLogin()
  }

  myFormLogin() {
    this.checkoutParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        code: new FormControl('', [
          Validators.required,
        ])
      })
    })
  }
  get code() {
    return this.checkoutParentGroup.get('user.code')
  }

  done() {
    console.log(this.checkoutParentGroup.controls['user'].value.code)
    if (this.checkoutParentGroup.invalid) {
      this.checkoutParentGroup.markAllAsTouched()
      return
    }
    this.auth.activeAccount(
      this.email,
      this.checkoutParentGroup.controls['user'].value.code
    ).subscribe({
      next: response => {
        if (response.result == 1) {
          sessionStorage.removeItem("emailActive")
          this.router.navigateByUrl("/login")
        } else {
          alert("Invalid Code");
        }
      }
    })

  }



}
