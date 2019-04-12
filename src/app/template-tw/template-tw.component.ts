import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CertificateModel } from '../models/certificate.model';

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

  ngOnInit() {
  }
}