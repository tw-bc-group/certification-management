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
    const color = Constants.BACKGROUND_COLOR[this.certificate.certName];
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;
  }

  get radialGradientColor(): string {
    const color = Constants.BACKGROUND_COLOR[this.certificate.certName];
    return `rgb(${color.red - 3}, ${color.green - 25}, ${color.blue - 17})`;
  }

  ngOnInit() {
  }
}
