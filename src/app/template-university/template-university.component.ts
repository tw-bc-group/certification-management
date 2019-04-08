import { Component, Input, OnInit } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Component({
  selector: 'app-template-university',
  templateUrl: './template-university.component.html',
  styleUrls: ['./template-university.component.scss'],
})
export class TemplateUniversityComponent implements OnInit {
  @Input()
  certificate: CertificateModel;

  constructor() {
  }

  ngOnInit() {
  }

}
