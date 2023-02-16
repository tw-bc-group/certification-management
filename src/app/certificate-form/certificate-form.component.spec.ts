import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateFormComponent } from './certificate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChineseNamePipe } from '../pipes/chinese-name.pipe';
import { NzFormModule } from 'ng-zorro-antd';

xdescribe('CertificateFormComponent', () => {
  let component: CertificateFormComponent;
  let fixture: ComponentFixture<CertificateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateFormComponent, ChineseNamePipe],
      imports: [ReactiveFormsModule, NzFormModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
