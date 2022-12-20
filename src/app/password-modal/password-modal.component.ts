import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

require('dotenv').config({path: '../../../.env'});

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
})
export class PasswordModalComponent implements OnInit {
  password: string;

  constructor() {
  }


  @Input()
  isVisible: boolean;

  @Output()
  issueCertificate: EventEmitter<any> = new EventEmitter();

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  verifyPassword() {
    // return this.password === (window as any).certificatePassword ? true : false;
    const pswd = process.env.PASSWORD;
    console.log(pswd);
    return this.password === pswd ? true : false;
  }

  handleOk(): void {
    const result = this.verifyPassword();
    if (result) {
      this.issueCertificate.emit();
    } else {
      alert('密码错误，证书颁发失败');
    }
    this.visibleChange.emit(false);
  }

  handleCancel(): void {
    this.visibleChange.emit(false);
  }


  ngOnInit() {
  }


}
