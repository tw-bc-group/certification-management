import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

  get username() {return this.loginForm.get('username'); }
  get password() {
    return this.loginForm.get('password');
  }

  validateUsername() {
    const invalid = this.username.value !== environment.username;
    if (invalid) {
      this.username.setErrors({ invalidUsername: true });
    }
    return invalid;
  }

  validatePassword() {
    const invalid = this.password.value !== environment.password;
    if (invalid) {
      this.password.setErrors({ invalidPassword: true });
    }
    return invalid;
  }

  loginSubmit() {
    if (this.validateUsername() || this.validatePassword()) {
      return;
    }
    this.router.navigate(['/', 'certification-management']);
  }

}
