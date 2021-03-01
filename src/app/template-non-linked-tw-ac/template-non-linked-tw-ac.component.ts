import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CertificateLevel, CertificateModel} from "../models/certificate.model";
import {certificationColors} from "../utils/constants";

@Component({
  selector: 'app-template-non-linked-tw-ac',
  templateUrl: './template-non-linked-tw-ac.component.html',
  styleUrls: ['./template-non-linked-tw-ac.component.scss']
})
export class TemplateNonLinkedTwAcComponent implements OnInit {
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
