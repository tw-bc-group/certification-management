import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';
import { Constants } from './../utils/constants';

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
    return Constants.BACKGROUND_COLOR[this.certificate.certName];
  }

  get radialGradientColor(): string {
    return Constants.RADIALGRADIENT_COLOR[this.certificate.certName];
  }

  ngOnInit() {
  }
}
