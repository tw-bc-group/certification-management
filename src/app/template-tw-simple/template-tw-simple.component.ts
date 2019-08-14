import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

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

  getCertBackgroundClass(): string {
    return {
      'AGILE COACH': 'background',
      'ADVANCED AGILE COACH': 'background-advanced',
      'MASTER AGILE COACH': 'background-master'
    }[this.certificate.certName];
  }

  getCertGradientClass(): string {
    return {
      'AGILE COACH': 'radialGradient',
      'ADVANCED AGILE COACH': 'radialGradient-advanced',
      'MASTER AGILE COACH': 'radialGradient-master'
    }[this.certificate.certName];
  }

  ngOnInit() {
  }
}
