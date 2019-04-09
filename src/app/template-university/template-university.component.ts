import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Component({
  selector: 'app-template-university',
  templateUrl: './template-university.component.html',
  styleUrls: ['./template-university.component.scss'],
})
export class TemplateUniversityComponent implements OnInit {
  @Input()
  certificate: CertificateModel;

  @ViewChild('svg')
  svg: SVGSVGElement;

  constructor() {
  }

  ngOnInit() {
  }

}
