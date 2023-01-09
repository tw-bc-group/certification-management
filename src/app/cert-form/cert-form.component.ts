import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CertificateDirectionOptions,
  CertificateLevel,
  CertificateModel,
  CertificateTemplateOptions,
  DpmLevel,
  dpmLevelNameMapping,
  PartnerOptions
} from '../models/certificate.model';

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

  @Input()
  certificate: CertificateModel;

  @Input()
  certificateTemplate: string;

  @Input()
  isLinkedCertificate: boolean;

  @Output()
  certificateTemplateChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
  }

  changeTemplate(value: string) {
    this.certificate.partner = null;
    this.certificateTemplateChange.emit(value);
  }

  onPhotoChanged(photoUrl: string): void {
    this.certificate.photoUrl = photoUrl;
  }

  onLogoChanged(logoUrl: string): void {
    this.certificate.logoUrl = logoUrl;
  }
}
