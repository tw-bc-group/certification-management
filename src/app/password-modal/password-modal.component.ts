import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

require('dotenv').config({path: '../../../.env'});

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
})
export class PasswordModalComponent implements OnInit {
  password: string;

  constructor(private message: NzMessageService) {
  }


  @Input()
  isVisible: boolean;

  @Output()
  issueCertificate: EventEmitter<any> = new EventEmitter();

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  verifyPassword() {
    return this.password === (window as any).certificatePassword ? true : false;
    // const pswd = process.env.PASSWORD;
    // console.log(pswd);
    // return this.password === pswd ? true : false;
  }

  handleOk(): void {
    const result = this.verifyPassword();
    if (result) {
      this.message.success('证书颁发成功', {
        nzDuration: 5000
      });
      this.issueCertificate.emit();

    } else {
      this.message.error('密码错误，证书颁发失败', {
        nzDuration: 5000
      });
    }
    this.visibleChange.emit(false);
  }

  handleCancel(): void {
    this.visibleChange.emit(false);
  }


  ngOnInit() {
  }


}
