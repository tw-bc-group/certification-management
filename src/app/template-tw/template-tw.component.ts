import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';
import { Constants } from './../utils/constants';

@Component({
  selector: 'app-template-tw',
  templateUrl: './template-tw.component.html',
  styleUrls: ['./template-tw.component.scss'],
})
export class TemplateTwComponent implements OnInit {
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
    return Constants.BACKGROUND_COLOR[this.certificate.certName];
  }

  get radialGradientColor(): string {
    return Constants.RADIALGRADIENT_COLOR[this.certificate.certName];
  }

  ngOnInit() {
  }
}
