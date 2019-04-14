import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import * as svgToDataUrl from 'svg-to-dataurl';
import { CertificateModel, CertificateType } from './models/certificate.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addYears, startOfDay } from 'date-fns';
import {hexify, retrieveContract, walletAddress} from './contracts/web3Provider';
import { HttpClient } from '@angular/common/http';
import { flatMap, map } from 'rxjs/operators';

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
    certName: 'Agile Coach',
    photoUrl: '',
    firstName: '',
    lastName: '',
    expiredAt: addYears(publishedAt, 2),
    publishedAt,
    fingerprint: '',
    partner: '',
    type: CertificateType.Tw,
    receiverAddress: ''
  };
  pngUrl: string;
  svgUrl: SafeResourceUrl;
  issued = false;
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
    this.onChain().then(tokenId => {
      const fingerprint = hexify(tokenId);
      this.certificate.fingerprint = fingerprint;
      this.loading = false;
      return fingerprint;
    }).then(tokenId => {
      if (tokenId !== null) {
        this.saveAsPng(tokenId, this.template.svgRef.nativeElement);
      }
    }).catch(err => {
        this.loading = false;
        console.error('fail to issue certification', err);
      }
    );
  }

  saveAsPng(tokenId: string, viewerSvg: SVGSVGElement): void {
    const svgUrl = this.toSvgUrl(viewerSvg);
    loadImage(svgUrl)
      .pipe(
        map(this.toPngUrl),
        flatMap(pngUrl => this.upload(tokenId, pngUrl))
      )
      .subscribe((message) => {
        alert(JSON.stringify(message));
        this.issued = true;
      });
  }

  upload(tokenId: string, data: string): Observable<any> {
    return this.http.post('/photos', {tokenId, data}, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  private toSvgUrl(viewerSvg: SVGSVGElement): string {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '600px');
    return svgToDataUrl(svg.outerHTML);
  }

  private toPngUrl(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  }

  downloadCert(viewerSvg: SVGSVGElement): void {
    const url = this.toSvgUrl(viewerSvg);
    this.svgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    loadImage(url).pipe(
      map(this.toPngUrl)
    ).subscribe((pngUrl) => {
      this.pngUrl = pngUrl;
      this.downloadLink = true;
    });
  }

  async onChain(): Promise<number> {
    this.loading = true;
    const tx = await retrieveContract().methods.issue(
      this.certificate.certName,
      this.certificate.firstName,
      this.certificate.lastName,
      this.certificate.publishedAt.valueOf(),
      this.certificate.expiredAt.valueOf(),
      JSON.stringify({type: this.certificate.type, partner: this.certificate.partner}),
      this.certificate.receiverAddress || walletAddress()
    ).send({from: walletAddress()});
    return tx.events.Transfer.returnValues.tokenId;
  }
}
