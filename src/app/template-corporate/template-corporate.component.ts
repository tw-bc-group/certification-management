import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Component({
  selector: 'app-template-corporate',
  templateUrl: './template-corporate.component.html',
  styleUrls: ['./template-corporate.component.scss'],
})
export class TemplateCorporateComponent implements OnInit {
  @Input()
  certificate: CertificateModel;

  @ViewChild('svg')
  svg: SVGSVGElement;

  constructor() {
  }

  ngOnInit() {
  }

}
