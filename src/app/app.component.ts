import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {from, Observable, Subject, zip} from 'rxjs';
import {
  CertificateDirection,
  CertificateLevel,
  CertificateModel,
  CertificateTemplateType,
  CertificateType,
  DpmLevel,
  NonLinkedCertificateLevel
} from './models/certificate.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {addYears, startOfDay} from 'date-fns';
import QRCode from 'qrcode';
import {hexify, retrieveContract, walletAddress} from './contracts/web3Provider';
import {HttpClient} from '@angular/common/http';
import {flatMap, map} from 'rxjs/operators';
import {Constants} from './utils/constants';
import {save} from './utils/photoStorage';
import {saveCertificate} from './utils/certificatesStorage';

// const certService = new CertificateService();

function loadImage(url: string): Observable<HTMLImageElement> {
  const result = new Subject<HTMLImageElement>();
  const image = document.createElement('img');
  image.src = url;
  image.addEventListener('load', () => {
    result.next(image);
  });
  return result.asObservable();
}

const publishedAt = startOfDay(new Date());

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  certificate: CertificateModel;
  certificateTemplate = CertificateTemplateType.TW_AC;
  pngUrl: SafeResourceUrl;
  svgUrl: SafeResourceUrl;
  downloadLink = false;
  loading = false;
  tabs = [{
    key: 'linkedCertificate',
    title: '上链证书'
  }, {
    key: 'nonLinkedCertificate',
    title: '非上链证书',
  }, {
    key: 'queryCertificate',
    title: '证书查询',
  }];
  tabKey = this.tabs[0].key;
  isVisible = false;

  @ViewChild('template')
  template: { svgRef: ElementRef };

  @ViewChild('TWSimple')
  templateSimple: { svgRef: ElementRef };

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.initCertificate();
  }

  ngOnDestroy(): void {
  }

  get isLinkedCertificate() {
    return this.tabKey === 'linkedCertificate';
  }

  onTabChange(tabKey, disabled): void {
    if (disabled) {
      return;
    }
    this.tabKey = tabKey;
    this.resetValues();
  }

  initCertificate(): void {
    // this.certificateTemplate = CertificateTemplateType.TW_AC;
    this.certificate = {
      certificateTemplate: CertificateTemplateType.TW_AC,
      certDirection: CertificateDirection.TECH,
      certName: this.isLinkedCertificate
        ? CertificateLevel.PROFESSIONAL_AGILE_COACH
        : NonLinkedCertificateLevel.AGILE_COACH,
      photoUrl: '',
      firstName: '',
      lastName: '',
      firstNamePinyin: '',
      lastNamePinyin: '',
      expiredAt: this.isLinkedCertificate ? addYears(publishedAt, 2) : null,
      publishedAt,
      fingerprint: '',
      partner: '',
      type: this.isLinkedCertificate ? CertificateType.ThoughtWorks : null,
      issuer: '',
      receiverAddress: '',
      dpmLevel: DpmLevel.JUNIOR,
      qrCode: this.isLinkedCertificate
        ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49" shape-rendering="crispEdges">' +
          '<path fill="#eaeaea" d="M0 0h49v49H0z"/></svg>'
        : null
    };
  }

  resetValues() {
    this.initCertificate();
    this.downloadLink = false;
    this.pngUrl = null;
    this.svgUrl = null;
  }

  onVisibleChange(isVisible: boolean): void {
    this.isVisible = isVisible;
  }

  onValueChange(queriedCertificate): void {
    // tslint:disable-next-line:forin
    for (const key in this.certificate) {
      this.certificate[key] = queriedCertificate[key];
    }
    this.certificate.firstName = queriedCertificate.name.split('_')[0];
    this.certificate.lastName = queriedCertificate.name.split('_')[0];
    this.svgUrl = queriedCertificate.svg.attributes.url;
    this.pngUrl = queriedCertificate.png.attributes.url;
    this.downloadLink = true;
  }

  showModal(): void {
    this.isVisible = true;
  }


  issue(): void {
    if (this.isLinkedCertificate) {
      this.issueLinkedCertificate();
    } else {
      this.issueNonLinkedCertificate();
    }
  }

  issueLinkedCertificate(): void {
    this
      .onChain()
      .then((certId) => this.displayCertIdAndQrCode(hexify(certId)))
      .then(() => Promise.all([this.generateDownloadUrl(), this.uploadCerts()]))
      .catch(err => {
          this.loading = false;
          this.downloadLink = false;
          console.error('fail to issue certification', err);
        }
      );
  }

  issueNonLinkedCertificate(): void {
    Promise.all([this.generateDownloadUrl(), this.uploadCerts()])
      .catch(err => {
          this.loading = false;
          this.downloadLink = false;
          console.error('fail to issue certification', err);
        }
      );
  }

  checkFormValidation(): boolean {
    const { firstName, lastName, issuer } = this.certificate;
    if (this.isLinkedCertificate) {
      return (!!firstName && !!lastName && !!issuer) ? false : true;
    } else {
      return (!!firstName && !!lastName) ? false : true;
    }
  }

  private async displayCertIdAndQrCode(certId: string) {
    this.certificate.qrCode = await QRCode.toString(Constants.CERT_VIEWER_URL + certId);
    this.certificate.fingerprint = certId;
    this.loading = false;
    return this.waitForViewChildReady();
  }

  private generateDownloadUrl() {
    this.svgUrl = this.toSvg(this.template.svgRef.nativeElement);
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    loadImage(svgDataUrl).pipe(flatMap(img => this.toPng(img))).subscribe(url => {
      this.downloadLink = true;
      this.pngUrl = url;
    });
  }

  private uploadCerts(): void {
    const {fingerprint, lastName, firstName} = this.certificate;
    const pictureName = `${lastName}_${firstName}`;

    if (this.isLinkedCertificate) {
      this.uploadCertsWithSimple(fingerprint, pictureName);
    } else {
      this.uploadCertsWithoutSimple(fingerprint, pictureName);
    }
  }

  private uploadCertsWithSimple(certId: string, pictureName: string): void {
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    const simpleSvgDataUrl = this.toSvgDataUrl(this.templateSimple.svgRef.nativeElement);

    zip(
      loadImage(simpleSvgDataUrl).pipe(map(img => this.toPngDataUrl(img))),
      loadImage(svgDataUrl).pipe(map(img => this.toPngDataUrl(img)))
    ).subscribe(([simplePngDataUrl, pngDataUrl]) => {
      this.upload(certId, [{
        key: 'png',
        fileName: `${pictureName}.png`,
        dataUrl: pngDataUrl
      }, {
        key: 'svg',
        fileName: `${pictureName}.svg`,
        dataUrl: svgDataUrl
      }, {
        key: 'simplePng',
        fileName: `${pictureName}_simple.png`,
        dataUrl: simplePngDataUrl
      }, {
        key: 'simpleSvg',
        fileName: `${pictureName}_simple.svg`,
        dataUrl: simpleSvgDataUrl
      }]).subscribe(({pngUrl, svgUrl}) => {
        this.svgUrl = svgUrl;
        this.pngUrl = pngUrl;
        this.downloadLink = true;
      });
    });
  }

  private uploadCertsWithoutSimple(certId: string, pictureName: string): void {
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    loadImage(svgDataUrl).pipe(map(img => this.toPngDataUrl(img)))
      .subscribe((pngDataUrl) => {
        // this.uploadCertificate(certId, pictureName);
        this.uploadCertificate(certId, [{
          key: 'png',
          fileName: `${pictureName}.png`,
          dataUrl: pngDataUrl
        }, {
          key: 'svg',
          fileName: `${pictureName}.svg`,
          dataUrl: svgDataUrl
        }]).subscribe(({pngUrl, svgUrl}) => {
          this.svgUrl = svgUrl;
          this.pngUrl = pngUrl;
          this.downloadLink = true;
        });
      });
  }


  // private uploadCompleteCerts(certId: string, pictureName: string): void {
  //   const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);

  //   loadImage(svgDataUrl).pipe(
  //     map(img => this.toPngDataUrl(img)),
  //     flatMap(pngDataUrl => this.upload(certId, [{
  //       key: 'png',
  //       fileName: `${pictureName}.png`,
  //       dataUrl: pngDataUrl
  //     }, {
  //       key: 'svg',
  //       fileName: `${pictureName}.svg`,
  //       dataUrl: svgDataUrl
  //     }]))
  //   ).subscribe(({pngUrl, svgUrl}) => {
  //     this.svgUrl = svgUrl;
  //     this.pngUrl = pngUrl;
  //     this.downloadLink = true;
  //   });
  // }

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
    return from(save({certId, photos}));
  }

  private uploadCertificate(certId: string, photos: any): Observable<any> {
    return from(saveCertificate({certId, photos, certificate: this.certificate}));
  }

  private toSvg(viewerSvg: SVGSVGElement): SafeResourceUrl {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '900px');
    const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
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
    canvas.toBlob(blob => {
      const url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
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
    const tx = await retrieveContract().methods.issue(
      this.certificate.certName,
      this.certificate.firstName,
      this.certificate.lastName,
      this.certificate.publishedAt.valueOf(),
      this.certificate.expiredAt.valueOf(),
      JSON.stringify({
        type: this.certificate.type,
        partner: this.certificate.partner,
        issuer: this.certificate.issuer
      }),
      this.certificate.receiverAddress || walletAddress()
    ).send({from: walletAddress()});
    return tx.events.Transfer.returnValues.tokenId;
    // const userId = 1;
    // const denomName = '';
    // const firstName = this.certificate.firstName;
    // const firstNamePinyin = this.certificate.firstNamePinyin;
    // const lastName = this.certificate.lastName;
    // const lastNamePinyin = this.certificate.lastNamePinyin;
    // const certName = this.certificate.certName;
    // const photoUrl = this.certificate.photoUrl;
    // const type = this.certificate.type;
    // const partner = this.certificate.partner;
    // const expiredAt = this.certificate.expiredAt;
    // const fingerprint = this.certificate.fingerprint;
    // const issuer = this.certificate.issuer;
    // const receiverAddress = this.certificate.receiverAddress;
    // const qrCode = this.certificate.qrCode;
    // const dpmLevel = this.certificate.dpmLevel;
    // // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    // const response = await certService.createDenomAndCertificate(userId, firstName, firstNamePinyin, lastName, lastNamePinyin, denomName, certName, photoUrl, type, partner, publishedAt, expiredAt, fingerprint, issuer, receiverAddress, qrCode, dpmLevel);
    // return response.certId;
  }
}
