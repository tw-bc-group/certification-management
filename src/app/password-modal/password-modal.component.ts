import {Component, Input, OnInit} from '@angular/core';

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

  handleOk(): void {
    console.log('Button ok clicked!', this.password);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  ngOnInit() {
  }


}
