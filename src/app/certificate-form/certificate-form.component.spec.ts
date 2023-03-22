import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CertificateFormComponent} from './certificate-form.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ChineseNamePipe} from '../pipes/chinese-name.pipe';
import {
  NzDatePickerModule,
  NzFormModule,
  NzRadioModule,
  NzSelectModule
} from 'ng-zorro-antd';
import {addYears, startOfDay} from 'date-fns';
import {
  AgileCoachCertificateDirectionOptions,
  CertificateDirection,
  CertificateLevel, CertificateTemplateOptions,
  CertificateTemplateType,
  CertificateType,
  CompanyRadios,
  DpmLevel,
  NonLinkedCertificateLevel
} from '../models/certificate.model';
import {DefaultQRCode} from '../utils/constants';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('CertificateFormComponent', () => {
  let component: CertificateFormComponent;
  let fixture: ComponentFixture<CertificateFormComponent>;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateFormComponent, ChineseNamePipe],
      imports: [ReactiveFormsModule, NzFormModule, FormsModule, NzRadioModule, NzSelectModule, BrowserAnimationsModule,
        NzDatePickerModule],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateFormComponent);
    component = fixture.componentInstance;
    fb =  TestBed.get(FormBuilder);
    component.certificateForm = fb.group({
      identityNumber: [''],
      certificateTemplate: [CertificateTemplateType.TW_AC],
      certDirection: [CertificateDirection.TECH],
      subordinateCompany: [CompanyRadios.THOUGHTWORKS],
      certName: [CertificateLevel.ASSOCIATE_AGILE_COACH],
      photoUrl: [''],
      logoUrl: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstNamePinyin: [''],
      lastNamePinyin: [''],
      expiredAt: [addYears(startOfDay(new Date()), 2)],
      publishedAt: [startOfDay(new Date())],
      fingerprint: [''],
      partner: [''],
      type: [CertificateType.Thoughtworks],
      issuer: ['', [Validators.required]],
      receiverAddress: [''],
      dpmLevel: [DpmLevel.JUNIOR],
      qrCode: [DefaultQRCode],
      phoneNumber: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create certificateFor,', () => {
    expect(component.certificateForm).toBeDefined();
  });

  it('should create form controls', () => {
    expect(component.certificateForm.get('certificateTemplate')).toBeTruthy();
    expect(component.certificateForm.get('certDirection')).toBeTruthy();
    expect(component.certificateForm.get('subordinateCompany')).toBeTruthy();
    expect(component.certificateForm.get('certName')).toBeTruthy();
    expect(component.certificateForm.get('firstName')).toBeTruthy();
    expect(component.certificateForm.get('lastName')).toBeTruthy();
    expect(component.certificateForm.get('expiredAt')).toBeTruthy();
    expect(component.certificateForm.get('publishedAt')).toBeTruthy();
    expect(component.certificateForm.get('issuer')).toBeTruthy();
    expect(component.certificateForm.get('dpmLevel')).toBeTruthy();
  });

  it('should valid certificateForm', () => {
    const firstNameControl = component.certificateForm.get('firstName');
    const lastNameControl = component.certificateForm.get('lastName');
    const issuerControl = component.certificateForm.get('issuer');
    firstNameControl.setValue('');
    lastNameControl.setValue('');
    issuerControl.setValue('');
    fixture.detectChanges();
    expect(component.certificateForm.invalid).toBeTruthy();
    expect(firstNameControl.errors.required).toBeTruthy();
    expect(lastNameControl.errors.required).toBeTruthy();
    expect(issuerControl.errors.required).toBeTruthy();
  });

  describe('certificateForm initialization', () => {
    it('should set default certificateForm correctly when certificateTemplate is TW_AC', () => {
      component.isOnChain = true;
      component.certificateForm.get('certificateTemplate').setValue(CertificateTemplateType.TW_AC);
      fixture.detectChanges();
      expect(component.certificateForm.get('certName').value).toEqual(CertificateLevel.ASSOCIATE_AGILE_COACH);
      expect(component.certificateForm.get('certDirection').value).toEqual(CertificateDirection.TECH);
      expect(component.certificateForm.get('subordinateCompany').value).toEqual(CompanyRadios.THOUGHTWORKS);
    });

    it('should set default certificateForm correctly when certificateTemplate is DPM', () => {
      component.isOnChain = true;
      const certificateTemplate = component.certificateForm.get('certificateTemplate');
      certificateTemplate.setValue(CertificateTemplateType.DPM);
      fixture.detectChanges();
      expect(component.certificateForm.get('certName').value).toEqual(DpmLevel.JUNIOR);
      expect(component.certificateForm.get('subordinateCompany').value).toEqual(CompanyRadios.THOUGHTWORKS);
    });

    it('should set default publishedAt, expiredAt, type, and qrCode correctly when isOnChain is true', () => {
      component.isOnChain = true;
      const publishedAt = component.certificateForm.get('publishedAt').value;
      expect(publishedAt).toEqual(startOfDay(new Date()));

      const expiredAt = component.certificateForm.get('expiredAt').value;
      expect(expiredAt).toEqual(addYears(startOfDay(new Date()), 2));

      const type = component.certificateForm.get('type').value;
      expect(type).toEqual(CertificateType.Thoughtworks);

      const qrCode = component.certificateForm.get('qrCode').value;
      expect(qrCode).toEqual(DefaultQRCode);
    });

    it('should set certName correctly when isOnChain is false', () => {
      component.isOnChain = false;
      const certificateTemplate = component.certificateForm.get('certificateTemplate');
      certificateTemplate.setValue(CertificateTemplateType.TW_AC);
      fixture.detectChanges();
      const certName = component.certificateForm.get('certName').value;
      expect(certName).toEqual(NonLinkedCertificateLevel.AGILE_COACH);
    });

    it('should reset certificateForm correctly when isOnChain is false', () => {
      component.isOnChain = false;
      component.certificateForm.get('certificateTemplate').setValue(CertificateTemplateType.TW_AC);
      fixture.detectChanges();
      expect(component.certificateForm.get('certificateTemplate').value).toEqual(CertificateTemplateType.TW_AC);
      expect(component.certificateForm.get('certName').value).toEqual(NonLinkedCertificateLevel.AGILE_COACH);
      expect(component.certificateForm.get('firstName').value).toBe('');
      expect(component.certificateForm.get('lastName').value).toBe('');
      expect(component.certificateForm.get('firstNamePinyin').value).toBe('');
      expect(component.certificateForm.get('lastNamePinyin').value).toBe('');
      expect(component.certificateForm.get('phoneNumber').value).toBe('');
    });
  });

  describe('certificateForm interaction', () => {
    it('should display and select options correctly when certificateTemplate is tw and onChain', () => {
      const typeControl = component.certificateForm.get('certificateTemplate');
      component.isOnChain = true;
      const certificateTemplateSelect = fixture.debugElement.query(By.css('[formControlName="certificateTemplate"]')).componentInstance;
      certificateTemplateSelect.nzOpen = true;
      fixture.detectChanges();
      const nzOptions = fixture.debugElement.queryAll(By.css('li'));
      expect(nzOptions.length).toEqual(CertificateTemplateOptions.length);

      const nzOption = nzOptions[0].nativeElement as HTMLElement;
      nzOption.click();
      fixture.detectChanges();
      expect(typeControl.value).toEqual(CertificateTemplateOptions[0].value);

    });

    it('should display and select certDirection options correctly when certificateTemplate is tw and onChain', () => {
      const typeControl = component.certificateForm.get('certificateTemplate');
      component.isOnChain = true;
      const certificateTemplateControl = component.certificateForm.get('certificateTemplate');
      certificateTemplateControl.setValue(CertificateTemplateType.TW_AC);
      fixture.detectChanges();

      const certDirectionSelect = fixture.debugElement.query(
        By.css('[formControlName="certDirection"]')).componentInstance;
      certDirectionSelect.nzOpen = true;
      fixture.detectChanges();
      const nzOptions = fixture.debugElement.queryAll(By.css('li'));
      expect(nzOptions.length).toEqual(AgileCoachCertificateDirectionOptions.length);
      const nzOption = nzOptions[0].nativeElement as HTMLElement;
      nzOption.click();
      fixture.detectChanges();
      expect(typeControl.value).toEqual(CertificateTemplateOptions[0].value);
    });

    it('should display and select certName options correctly when certificateTemplate is tw and onChain', () => {
      const typeControl = component.certificateForm.get('certificateTemplate');
      component.isOnChain = true;
      const certificateTemplateControl = component.certificateForm.get('certificateTemplate');
      certificateTemplateControl.setValue(CertificateTemplateType.TW_AC);
      fixture.detectChanges();

      const certNameSelect = fixture.debugElement.query(
        By.css('[formControlName="certName"]')).componentInstance;
      certNameSelect.nzOpen = true;
      fixture.detectChanges();
      const nzOptions = fixture.debugElement.queryAll(By.css('li'));
      const expected = component.certificateLevelOptions.length;
      expect(nzOptions.length).toEqual(expected);
      const nzOption = nzOptions[0].nativeElement as HTMLElement;
      nzOption.click();
      fixture.detectChanges();
      expect(typeControl.value).toEqual(CertificateTemplateOptions[0].value);
    });

    it('should default select TW as subordinateCompany', () => {
      expect(component.certificateForm.get('subordinateCompany').value).toEqual('Thoughtworks');
    });
  });
});
