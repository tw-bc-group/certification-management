import { fetchCertificate } from '../utils/certificatesStorage';
import { CertificateModel } from '../models/certificate.model';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'lodash';

@Component({
  selector: 'certification-detail-overlay',
  templateUrl: './certification-detail-overlay.component.html',
  styleUrls: ['./certification-detail-overlay.component.scss'],
})
export class CertificationDetailOverlayComponent implements OnInit {
  @Input()
  certId: string;

  // @Input()
  certDetail: CertificateModel;

  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  handleCheckClick(): void {
    fetchCertificate({
      certId: this.certId,
    })
      .then((cert) => {
        const certificates = map(cert, 'attributes');
        this.certDetail = certificates[0];
        this.isOpen = !this.isOpen;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleOutClick(): void {
    this.isOpen = !this.isOpen;
  }
}
