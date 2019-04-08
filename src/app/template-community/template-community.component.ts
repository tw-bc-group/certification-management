import { Component, Input, OnInit } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Component({
  selector: 'app-template-community',
  templateUrl: './template-community.component.html',
  styleUrls: ['./template-community.component.scss'],
})
export class TemplateCommunityComponent implements OnInit {
  @Input()
  certificate: CertificateModel;

  constructor() {
  }

  ngOnInit() {
  }

}
