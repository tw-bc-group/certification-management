import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

// require('dotenv').config({path: '../../../.env'});

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

  checkValidation(): boolean {
    return !this.password;
  }

  handleOk(): void {
    this.message.success('证书颁发成功', {
      nzDuration: 5000
    });
    this.issueCertificate.emit();
    this.visibleChange.emit(false);
  }

  handleCancel(): void {
    this.visibleChange.emit(false);
  }


  ngOnInit() {
  }


}
