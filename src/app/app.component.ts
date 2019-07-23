import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CertificateModel, CertificateType} from './models/certificate.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {addYears, startOfDay} from 'date-fns';
import QRCode from 'qrcode';
import {hexify, retrieveContract, walletAddress} from './contracts/web3Provider';
import {HttpClient} from '@angular/common/http';
import {flatMap, map} from 'rxjs/operators';

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
export class AppComponent implements OnDestroy {
  certificate: CertificateModel = {
    certName: 'AGILE COACH',
    photoUrl: '',
    firstName: '',
    lastName: '',
    expiredAt: addYears(publishedAt, 2),
    publishedAt,
    fingerprint: '',
    partner: '',
    type: CertificateType.ThoughtWorks,
    issuer: '',
    receiverAddress: '',
    qrCode: ''
  };
  pngUrl: SafeResourceUrl;
  svgUrl: SafeResourceUrl;
  downloadLink = false;
  loading = false;
  @ViewChild('template')
  template: { svgRef: ElementRef };

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) {
  }

  ngOnDestroy(): void {
  }

  issue(): void {
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

  private async displayCertIdAndQrCode(certId: string) {
    this.certificate.qrCode = await QRCode.toString(certId);
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
    const svgDataUrl = this.toSvgDataUrl(this.template.svgRef.nativeElement);
    const {fingerprint, lastName, firstName} = this.certificate;
    const pictureName = `${lastName}_${firstName}`;

    loadImage(svgDataUrl).pipe(
      map(img => this.toPngDataUrl(img)),
      flatMap(pngDataUrl => this.upload(fingerprint, [{
        fileName: `${pictureName}.png`,
        dataUrl: pngDataUrl
      }, {
        fileName: `${pictureName}.svg`,
        dataUrl: svgDataUrl
      }]))
    ).subscribe(({pngUrl, svgUrl}) => {
      this.svgUrl = svgUrl;
      this.pngUrl = pngUrl;
      this.downloadLink = true;
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
    return this.http.post('/photos', {certId, photos}, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  private toSvg(viewerSvg: SVGSVGElement): SafeResourceUrl {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '600px');
    const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
  }

  private toSvgDataUrl(viewerSvg: SVGSVGElement): string {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '600px');
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


  async onChain(): Promise<number> {
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
  }
}
