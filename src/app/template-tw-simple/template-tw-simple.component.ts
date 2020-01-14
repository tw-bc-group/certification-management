import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel, CertificateLevel } from '../models/certificate.model';
import { certificationColors } from './../utils/constants';

@Component({
  selector: 'app-template-tw-simple',
  templateUrl: './template-tw-simple.component.html',
  styleUrls: ['./template-tw-simple.component.scss'],
})
export class TemplateTwSimpleComponent implements OnInit {
  @Input()
  certificate: CertificateModel;

  @ViewChild('TWSimple')
  svgRef: ElementRef<SVGSVGElement>;

  constructor() {
  }

  get svg(): SVGSVGElement {
    return this.svgRef.nativeElement;
  }

  get backgroundColor(): string {
    return certificationColors[this.certificate.type][this.certificate.certName as CertificateLevel].baseColor;
  }

  get radialGradientColor(): string {
    return certificationColors[this.certificate.type][this.certificate.certName as CertificateLevel].radiaGradientColor;
  }

  ngOnInit() {
  }
}
