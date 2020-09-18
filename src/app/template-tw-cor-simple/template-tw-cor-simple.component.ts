import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel, CertificateLevel } from '../models/certificate.model';
import { certificationColors } from './../utils/constants';

@Component({
  selector: 'app-template-tw-cor-simple',
  templateUrl: './template-tw-cor-simple.component.html',
  styleUrls: ['./template-tw-cor-simple.component.scss'],
})
export class TemplateTwCorSimpleComponent implements OnInit {
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
