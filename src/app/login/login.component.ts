import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private message: NzMessageService) { }

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
    const usernameInvalid = this.username.value !== environment.username;
    const passwordInvalid = this.password.value !== environment.password;
    let messageId;
    if (usernameInvalid || passwordInvalid) {
      messageId = this.message.error('用户名或密码错误，请重试').messageId;
      return;
    }
    this.message.remove(messageId);
    this.router.navigate(['/', 'certification-management']);
  }

}
