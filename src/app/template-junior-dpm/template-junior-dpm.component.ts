import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

@Component({
  selector: 'app-template-junior-dpm',
  templateUrl: './template-junior-dpm.component.html',
  styleUrls: ['./template-junior-dpm.component.scss'],
})
export class TemplateJuniorDPMComponent implements OnInit {
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
