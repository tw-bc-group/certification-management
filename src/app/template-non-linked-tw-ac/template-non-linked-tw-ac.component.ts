import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CertificateModel, CertificateTemplateType} from '../models/certificate.model';

@Component({
  selector: 'app-template-non-linked-tw-ac',
  templateUrl: './template-non-linked-tw-ac.component.html',
  styleUrls: ['./template-non-linked-tw-ac.component.scss']
})
export class TemplateNonLinkedTwAcComponent implements OnInit {
  certificateTemplateType = CertificateTemplateType;
  @Input()
  certificate: CertificateModel;

  @Input()
  certificateTemplate: CertificateTemplateType;

  @ViewChild('svg')
  svgRef: ElementRef<SVGSVGElement>;

  constructor() {
  }

  get svg(): SVGSVGElement {
    return this.svgRef.nativeElement;
  }

  get backgroundColor(): string {
    return '#F68548';
  }

  ngOnInit() {
  }

}
