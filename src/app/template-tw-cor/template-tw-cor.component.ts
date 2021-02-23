import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel, CertificateLevel } from '../models/certificate.model';
import { certificationColors } from '../utils/constants';

@Component({
  selector: 'app-template-tw-cor',
  templateUrl: './template-tw-cor.component.html',
  styleUrls: ['./template-tw-cor.component.scss'],
})
export class TemplateTwCorComponent implements OnInit {
  certificateLevel = CertificateLevel;

  @Input()
  certificate: CertificateModel;

  @ViewChild('svg')
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
