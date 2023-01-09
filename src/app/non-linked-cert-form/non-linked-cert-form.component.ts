import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  CertificateDirectionOptions,
  CertificateModel,
  CertificateTemplateOptions,
  NonLinkedCertificateLevel,
  PartnerOptions
} from '../models/certificate.model';

@Component({
  selector: 'app-non-linked-cert-form',
  templateUrl: './non-linked-cert-form.component.html',
  styleUrls: ['./non-linked-cert-form.component.scss']
})
export class NonLinkedCertFormComponent implements OnInit {

  constructor() {
  }

  certificateLevelOptions = Object.keys(NonLinkedCertificateLevel).map((level) => ({
    value: NonLinkedCertificateLevel[level],
    label: NonLinkedCertificateLevel[level]
  }));
  certificateTemplateOptions = CertificateTemplateOptions.filter(option => option.value !== 'dpm');
  partnerOptions = PartnerOptions;
  certificateDirectionOptions = CertificateDirectionOptions;

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
