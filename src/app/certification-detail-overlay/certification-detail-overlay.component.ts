import { CertificateModel } from '../models/certificate.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certification-detail-overlay',
  templateUrl: './certification-detail-overlay.component.html',
  styleUrls: ['./certification-detail-overlay.component.scss'],
})
export class CertificationDetailOverlayComponent implements OnInit {
  @Input()
  certDetail: CertificateModel;

  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  handleCheckClick(): void {
    this.isOpen = !this.isOpen;
  }

  handleOutClick(): void {
    this.isOpen = !this.isOpen;
  }
}
