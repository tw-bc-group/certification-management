import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fetchCertificate} from '../utils/certificatesStorage';
import {MatPaginator} from '@angular/material/paginator';
import {
  CertificateDirection,
  CertificateDirectionOptions, CertificateModel,
  CertificateTemplateOptions, CertificateTemplateType,
} from '../models/certificate.model';
import {map} from 'lodash';

interface Header {
  certificateTemplate: number;
  certDirection: string;
  level: number;
  subordinateCompany: string;
  expiredAt: Date;
  name: string;
}

@Component({
  selector: 'app-query-page',
  templateUrl: './query-page.component.html',
  styleUrls: ['./query-page.component.scss'],
})


export class QueryPageComponent implements OnInit {
  listOfData: Header[] = [];

  constructor() {
    this.search();
  }

  nameText: string;

  certDirectionText: CertificateDirection;

  certCount = 0;

  certificateTemplateOptions = CertificateTemplateOptions;
  certificateDirectionOptions = CertificateDirectionOptions;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @Output()
  valueChange: EventEmitter<any> = new EventEmitter();

  search(): void {
    const name = this.nameText;
    fetchCertificate({name, certDirection: this.certDirectionText})
      .then((list) => {
        // @ts-ignore
        this.valueChange.emit(list[0].attributes);
        const certificates = map(list, 'attributes');
        this.mapCertificationList(certificates);
        this.certCount = certificates.length;
    }).catch(err => {
      console.log(err);
    });
  }

  mapCertificationList(certificates): void {
    this.listOfData = map(certificates, certification => ({
      certificateTemplate: certification.certificateTemplate,
      certDirection: certification.certDirection,
      level: certification.certName,
      subordinateCompany: certification.subordinateCompany,
      expiredAt: certification.expiredAt,
      name: certification.name,
      }));
  }

  initSearchText(): void {
    this.nameText = '';
  }

  ngOnInit(): void {
    this.initSearchText();
  }

  handleNameClear(): void {
    this.nameText = '';
    this.search();
  }

}
