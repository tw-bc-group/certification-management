import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CertificateDirection,
  CertificateDirectionOptions,
  CertificateLevel,
  CertificateModel,
  CertificateTemplateOptions,
  CompanyRadios,
  DpmLevel,
  dpmLevelNameMapping,
  PartnerOptions
} from '../models/certificate.model';
import {companies} from '../utils/otherCompanies';

@Component({
  selector: 'app-cert-form',
  templateUrl: './cert-form.component.html',
  styleUrls: ['./cert-form.component.scss'],
})
export class CertFormComponent implements OnInit {

  constructor() {
  }
  dpmLevelOptions = Object.keys(DpmLevel).map((level) => ({
    value: level,
    label: dpmLevelNameMapping[level]
  }));
  certificateLevelOptions = Object.keys(CertificateLevel).map((level) => ({
    value: CertificateLevel[level],
    label: CertificateLevel[level]
  }));
  certificateDirectionOptions = CertificateDirectionOptions;
  certificateTemplateOptions = CertificateTemplateOptions;
  partnerOptions = PartnerOptions;
  otherCompaniesOptions = companies;

  companyRadio = CompanyRadios.THOUGHTWORKS;

  @Input()
  certificate: CertificateModel;

  @Input()
  certificateTemplate: string;

  @Input()
  subordinateCompany: string;

  @Output()
  certificateTemplateChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  subordinateCompanyChange: EventEmitter<string> = new EventEmitter<string>();

  isAddCompanyModalVisible = false;

  ngOnInit() {
  }

  get companyRadios() {
    return CompanyRadios;
  }

  changeTemplate(value: string) {
    this.certificate.partner = null;
    value === 'dpm' ?
      this.certificate.certDirection = CertificateDirection.PRODUCT :
      this.certificate.certDirection = CertificateDirection.MANAGE;
    this.certificateTemplateChange.emit(value);
  }

  changeSubordinateCompany(value: string) {
    value === CompanyRadios.THOUGHTWORKS ?
      this.certificate.subordinateCompany = CompanyRadios.THOUGHTWORKS :
      this.certificate.subordinateCompany = '';
    this.subordinateCompanyChange.emit(value);
  }

  onPhotoChanged(photoUrl: string): void {
    this.certificate.photoUrl = photoUrl;
  }

  onLogoChanged(logoUrl: string): void {
    this.certificate.logoUrl = logoUrl;
  }

  onVisibleChange(isVisible: boolean): void {
    this.isAddCompanyModalVisible = isVisible;
  }

  addCompany(companyName: string): void {
    this.otherCompaniesOptions.push(companyName);
    this.certificate.subordinateCompany = companyName;
  }
}
