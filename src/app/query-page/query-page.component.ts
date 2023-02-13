import { Component, OnInit, ViewChild } from '@angular/core';
import { fetchCertificate } from '../utils/certificatesStorage';
import { MatPaginator } from '@angular/material/paginator';
import {
  CertificateDirection,
  CertificateDirectionOptions,
} from '../models/certificate.model';
import { map } from 'lodash';

interface Header {
  certId: string;
  certificateTemplate: number;
  certDirection: string;
  level: number;
  subordinateCompany: string;
  expiredAt: Date;
  name: string;
  pngUrl: File;
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

  subordinateCompanyText: string;
  certCount = 0;

  certificateDirectionSelectOptions = CertificateDirectionOptions;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  search(): void {
    const name = this.nameText;
    const subordinateCompany = this.subordinateCompanyText;
    fetchCertificate({
      name,
      certDirection: this.certDirectionText,
      subordinateCompany,
    })
      .then((list) => {
        const certificates = map(list, 'attributes');
        this.mapCertificationList(certificates);
        this.certCount = certificates.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  mapCertificationList(certificates): void {
    this.listOfData = map(certificates, (certification) => ({
      certId: certification.certId,
      certificateTemplate: certification.certificateTemplate,
      certDirection: certification.certDirection,
      level: certification.certName,
      subordinateCompany: certification.subordinateCompany,
      expiredAt: certification.expiredAt,
      name: certification.name,
      pngUrl: certification.png.attributes.url,
    }));
  }

  initSearchText(): void {
    this.nameText = '';
    this.subordinateCompanyText = '';
  }

  ngOnInit(): void {
    this.initSearchText();
  }

  handleNameClear(): void {
    this.nameText = '';
    this.search();
  }
  handleSubordinateCompanyClear(): void {
    this.subordinateCompanyText = '';
    this.search();
  }
}
