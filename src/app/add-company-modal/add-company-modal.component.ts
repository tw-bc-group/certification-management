import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-company-modal',
  templateUrl: './add-company-modal.component.html',
})
export class AddCompanyModalComponent implements OnInit {
  companyName: string;

  constructor(private message: NzMessageService) {
  }


  @Input()
  isVisible: boolean;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  addCompany: EventEmitter<string> = new EventEmitter<string>();

  checkValidation(): boolean {
    return !this.companyName;
  }

  handleOk(): void {
    console.log('gongsi', this.companyName);
    this.addCompany.emit(this.companyName);
    this.visibleChange.emit(false);
  }

  handleCancel(): void {
    this.visibleChange.emit(false);
  }


  ngOnInit() {
  }


}
