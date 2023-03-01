import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { from, Observable, Subject, zip } from 'rxjs';
import {
  CertificateDirection,
  CertificateLevel,
  CertificateTabs,
  CertificateTemplateType,
  CertificateType,
  CompanyRadios,
  DpmLevel,
} from '../models/certificate.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addYears, startOfDay } from 'date-fns';
import QRCode from 'qrcode';
import { hexify } from '../contracts/web3Provider';
import { HttpClient } from '@angular/common/http';
import { flatMap, map } from 'rxjs/operators';
import { Constants, DefaultQRCode } from '../utils/constants';
import { save } from '../utils/photoStorage';
import { saveCertificate } from '../utils/certificatesStorage';
import CertificateService from '../service/certificate.service';
import { generateCertificateId } from '../clients/certificate';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, Validators } from '@angular/forms';

const certService = new CertificateService();

function loadImage(url: string): Observable<HTMLImageElement> {
  const result = new Subject<HTMLImageElement>();
  const image = document.createElement('img');
  image.src = url;
  image.addEventListener('load', () => {
    result.next(image);
  });
  return result.asObservable();
}

@Component({
  selector: 'app-certification-management',
  templateUrl: './certification-management.component.html',
  styleUrls: ['./certification-management.component.scss'],
})
export class CertificationManagementComponent implements OnInit, OnDestroy {
  pngUrl: SafeResourceUrl;
  svgUrl: SafeResourceUrl;
  downloadLink = false;
  loading = false;
  tabs = [
    {
      key: CertificateTabs.CERTIFICATE_PUBLISH,
      title: '证书发布',
    },
    {
      key: CertificateTabs.QUERY_CERTIFICATE,
      title: '证书查询',
    },
  ];
  tabKey = this.tabs[0].key;
  subTabs = [
    {
      key: CertificateTabs.ON_CHAIN_CERTIFICATE,
      title: '上链证书',
    },
    {
      key: CertificateTabs.OFF_CHAIN_CERTIFICATE,
      title: '非上链证书',
    },
  ];
  subTabKey = this.subTabs[0].key;
  certificateForm = this.fb.group({
    identityNumber: [''],
    certificateTemplate: [CertificateTemplateType.TW_AC],
    certDirection: [CertificateDirection.TECH],
    subordinateCompany: [CompanyRadios.THOUGHTWORKS],
    certName: [CertificateLevel.ASSOCIATE_AGILE_COACH],
    photoUrl: [''],
    logoUrl: [''],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    firstNamePinyin: [''],
    lastNamePinyin: [''],
    expiredAt: [addYears(startOfDay(new Date()), 2)],
    publishedAt: [startOfDay(new Date())],
    fingerprint: [''],
    partner: [''],
    type: [CertificateType.Thoughtworks],
    issuer: ['', [Validators.required]],
    receiverAddress: [''],
    dpmLevel: [DpmLevel.JUNIOR],
    qrCode: [DefaultQRCode],
    phoneNumber: ['']
  });

  @ViewChild('template')
  template: { svgRef: ElementRef };

  @ViewChild('TWSimple')
  templateSimple: { svgRef: ElementRef };

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  get isOnChain() {
    return this.subTabKey === CertificateTabs.ON_CHAIN_CERTIFICATE;
  }

  get isCertificatePublish() {
    return this.tabKey === CertificateTabs.CERTIFICATE_PUBLISH;
  }

  get certificateTabs() {
    return CertificateTabs;
  }

  onTabChange(tabKey): void {
    this.tabKey = tabKey;
    this.resetValues();
  }

  onSubTabChange(subTabKey): void {
    this.subTabKey = subTabKey;
    this.resetValues();
  }

  resetValues() {
    this.downloadLink = false;
    this.pngUrl = null;
    this.svgUrl = null;
  }

  issue(): void {
    if (this.isOnChain) {
      this.issueOnChainCertificate();
    } else {
      this.issueOffChainCertificate();
    }
  }

  issueOnChainCertificate(): void {
    this.onChain()
      .then((certId) => this.displayCertIdAndQrCode(hexify(certId)))
      .then(() => Promise.all([this.generateDownloadUrl(), this.uploadCerts()]))
      .then(() => {
        this.message.success('证书颁发成功', {
          nzDuration: 5000,
        });
      })
      .catch((err) => {
        this.downloadLink = false;
        console.error('fail to issue certification', err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  issueOffChainCertificate(): void {
    this.loading = true;
    Promise.all([this.generateDownloadUrl(), this.uploadCerts()])
      .then(() => {
        this.message.success('证书颁发成功', {
          nzDuration: 5000,
        });
      })
      .catch((err) => {
        this.downloadLink = false;
        console.error('fail to issue certification', err);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  checkFormValidation(): boolean {
    const { firstName, lastName, issuer, subordinateCompany } =
      this.certificateForm.value;
    if (this.isOnChain) {
      return !(!!firstName && !!lastName && !!issuer && !!subordinateCompany);
    } else {
      return !(!!firstName && !!lastName && !!subordinateCompany);
    }
  }

  private async displayCertIdAndQrCode(certId: string) {
    const qrCode = await QRCode.toString(Constants.CERT_VIEWER_URL + certId);
    this.certificateForm.patchValue({
      qrCode,
      fingerprint: certId,
    });
    return this.waitForViewChildReady();
  }

  private generateDownloadUrl() {
    this.svgUrl = this.toSvg(this.template.svgRef.nativeElement);
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    loadImage(svgDataUrl)
      .pipe(flatMap((img) => this.toPng(img)))
      .subscribe((url) => {
        this.downloadLink = true;
        this.pngUrl = url;
      });
  }

  private uploadCerts(): void {
    const { fingerprint, lastName, firstName } = this.certificateForm.value;
    const pictureName = `${lastName}${firstName}`;

    if (this.isOnChain) {
      this.uploadCertsWithSimple(fingerprint, pictureName);
    } else {
      this.uploadCertsWithoutSimple(pictureName);
    }
  }
  private uploadCertsWithSimple(certId: string, pictureName: string): void {
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    const simpleSvgDataUrl = this.toSvgDataUrl(
      this.templateSimple.svgRef.nativeElement
    );

    zip(
      loadImage(simpleSvgDataUrl).pipe(map((img) => this.toPngDataUrl(img))),
      loadImage(svgDataUrl).pipe(map((img) => this.toPngDataUrl(img)))
    ).subscribe(([simplePngDataUrl, pngDataUrl]) => {
      this.uploadCertificate(certId, [
        {
          key: 'png',
          fileName: `${pictureName}.png`,
          dataUrl: pngDataUrl,
        },
        {
          key: 'svg',
          fileName: `${pictureName}.svg`,
          dataUrl: svgDataUrl,
        },
        {
          key: 'simplePng',
          fileName: `${pictureName}_simple.png`,
          dataUrl: simplePngDataUrl,
        },
        {
          key: 'simpleSvg',
          fileName: `${pictureName}_simple.svg`,
          dataUrl: simpleSvgDataUrl,
        },
      ]).subscribe(({ pngUrl, svgUrl }) => {
        this.svgUrl = svgUrl;
        this.pngUrl = pngUrl;
        this.downloadLink = true;
      });
    });
  }

  private uploadCertsWithoutSimple(pictureName: string): void {
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    const certId = generateCertificateId(1);
    loadImage(svgDataUrl)
      .pipe(map((img) => this.toPngDataUrl(img)))
      .subscribe((pngDataUrl) => {
        this.uploadCertificate(certId, [
          {
            key: 'png',
            fileName: `${pictureName}.png`,
            dataUrl: pngDataUrl,
          },
          {
            key: 'svg',
            fileName: `${pictureName}.svg`,
            dataUrl: svgDataUrl,
          },
        ]).subscribe(({ pngUrl, svgUrl }) => {
          this.svgUrl = svgUrl;
          this.pngUrl = pngUrl;
          this.downloadLink = true;
        });
      });
  }

  // Wait 1 second for fingerprint to be ready for show.
  // TODO workaround: https://stackoverflow.com/questions/44948053/angular4-how-to-know-when-a-viewchild-has-been-reset
  private waitForViewChildReady() {
    return new Promise<string>((resolve) => {
      const wait = setTimeout(() => {
        clearTimeout(wait);
        resolve('workaround!');
      }, 1000);
    });
  }

  private upload(certId: string, photos: any): Observable<any> {
    return from(save({ certId, photos }));
  }

  private uploadCertificate(certId: string, photos: any): Observable<any> {
    // save: table of Photo
    // saveCertificate: table of Certificate
    saveCertificate({ certId, photos, certificate: this.certificateForm.value });
    return from(save({ certId, photos }));
  }

  private toSvg(viewerSvg: SVGSVGElement): SafeResourceUrl {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '900px');
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private toSvgDataUrl(viewerSvg: SVGSVGElement): string {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '900px');
    const base64Data = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    return `data:image/svg+xml;base64,${base64Data}`;
  }

  private toPng(img: HTMLImageElement): Observable<SafeResourceUrl> {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const result = new Subject<SafeResourceUrl>();
    canvas.toBlob((blob) => {
      const url = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(blob)
      );
      result.next(url);
    });

    return result.asObservable();
  }

  private toPngDataUrl(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  }

  async onChain(): Promise<string> {
    this.loading = true;
    const response = await certService.mintAndTransferCertificate(
      this.certificateForm.value
    );
    return response.hash;
  }
}
