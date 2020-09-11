import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Component({
  selector: 'app-template-junior-dpm-simple',
  templateUrl: './template-junior-dpm-simple.component.html',
  styleUrls: ['./template-junior-dpm-simple.component.scss'],
})
export class TemplateJuniorDPMSimpleComponent implements OnInit {
  @Input()
  certificate: CertificateModel;

  @ViewChild('svg')
  svgRef: ElementRef<SVGSVGElement>;

  constructor() {
  }

  get svg(): SVGSVGElement {
    return this.svgRef.nativeElement;
  }

  ngOnInit() {
  }
}
