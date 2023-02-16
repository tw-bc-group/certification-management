import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  AgileCoachCertificateDirectionOptions,
  CertificateLevel,
  CertificateTemplateOptions,
  CertificateTemplateType,
  CertificateType,
  CompanyRadios,
  DpmLevel,
  NonLinkedCertificateLevel,
} from '../models/certificate.model';
import { addYears, startOfDay } from 'date-fns';
import { companies } from '../utils/otherCompanies';
import { DefaultQRCode } from '../utils/constants';

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss']
})
export class CertificateFormComponent implements OnInit, OnChanges {

  @Input()
  isOnChain: boolean;

  @Input()
  certificateForm;

  dpmLevelOptions = Object.keys(DpmLevel).map((level) => ({
    value: DpmLevel[level],
    label: DpmLevel[level],
  }));
  companyRadio = CompanyRadios.THOUGHTWORKS;

  isAddCompanyModalVisible = false;
  otherCompaniesOptions = companies;

  constructor() { }

  ngOnInit() {
    this.certificateForm.get('certificateTemplate').valueChanges.subscribe(value => {
      const certName = this.isOnChain
        ? value === CertificateTemplateType.TW_AC
          ? CertificateLevel.ASSOCIATE_AGILE_COACH
          : DpmLevel.JUNIOR
        : NonLinkedCertificateLevel.AGILE_COACH;
      this.certificateForm.patchValue({certName});
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isOnChain.currentValue) {
      const certificateTemplate = this.certificateForm.get('certificateTemplate').value;
      this.certificateForm.patchValue({
        certName: (certificateTemplate === CertificateTemplateType.TW_AC
          ? CertificateLevel.ASSOCIATE_AGILE_COACH : DpmLevel.JUNIOR),
        expiredAt: addYears(startOfDay(new Date()), 2),
        type: CertificateType.Thoughtworks,
        qrCode: DefaultQRCode,
      });
    } else {
      this.certificateForm.patchValue({
        certificateTemplate: CertificateTemplateType.TW_AC,
        certName: NonLinkedCertificateLevel.AGILE_COACH,
        expiredAt: null,
        type: null,
        qrCode: null,
      });
    }
  }

  get certificateTemplateOptions() {
    return this.isOnChain
      ? CertificateTemplateOptions
      : CertificateTemplateOptions.filter(({ value }) => value !== CertificateTemplateType.DPM);
  }

  get certificateDirectionOptions() {
    return AgileCoachCertificateDirectionOptions;
  }

  get certificateLevelOptions() {
    return this.isOnChain
      ? Object.keys(CertificateLevel).map((level) => ({
        value: CertificateLevel[level],
        label: CertificateLevel[level],
      }))
      : Object.keys(NonLinkedCertificateLevel).map(
      (level) => ({
        value: NonLinkedCertificateLevel[level],
        label: NonLinkedCertificateLevel[level],
      })
    );
  }

  get companyRadios() {
    return CompanyRadios;
  }

  get isTemplateTypeTw() {
    return this.certificateForm.get('certificateTemplate').value === CertificateTemplateType.TW_AC;
  }

  get isTemplateTypeDpm() {
    return this.certificateForm.get('certificateTemplate').value === CertificateTemplateType.DPM;
  }

  onVisibleChange(isVisible: boolean): void {
    this.isAddCompanyModalVisible = isVisible;
  }

  changeSubordinateCompany(value: string) {
    value === CompanyRadios.THOUGHTWORKS
      ? this.certificateForm.patchValue({subordinateCompany: CompanyRadios.THOUGHTWORKS})
      : this.certificateForm.patchValue({subordinateCompany: ''});
  }

  addCompany(companyName: string): void {
    this.otherCompaniesOptions.push(companyName);
    this.certificateForm.patchValue({subordinateCompany: companyName});
  }
}
