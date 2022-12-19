import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  verifyPassword() {
    return this.password === '001' ? true : false;
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.password);
    const result = this.verifyPassword();
    if (result) {
      this.issueCertificate.emit();
    }
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  ngOnInit() {
  }


}
