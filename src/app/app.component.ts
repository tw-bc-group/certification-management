import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as svgToDataUrl from 'svg-to-dataurl';
import { CertificateModel, CertificateType } from './models/certificate.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addYears, startOfDay } from 'date-fns';
import { hexify, retrieveContract } from './contracts/web3Provider';
import { HttpClient } from '@angular/common/http';


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
  };
  pngUrl: string;
  svgUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) {
  }

  ngOnDestroy(): void {
  }

  saveAsPng(viewerSvg: SVGSVGElement): void {
    this.onChain().then(tokenId => {
      const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
      svg.setAttribute('width', '600px');
      const svgUrl = svgToDataUrl(svg.outerHTML);
      loadImage(svgUrl).subscribe((img) => {
        this.svgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(svgUrl);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        this.pngUrl = canvas.toDataURL('image/png');
        this.upload(tokenId, this.pngUrl).subscribe((r) => console.log(r));
      });
    });
  }

  upload(tokenId: string, data: string): Observable<any> {
    return this.http.post('/photos', {tokenId, data}, {
      headers: {'Content-Type': 'application/json'}
    });
  }

  async onChain(): Promise<string> {
    const tx = await retrieveContract().methods.issue(
      this.certificate.certName,
      this.certificate.firstName,
      this.certificate.lastName,
      this.certificate.publishedAt.valueOf(),
      this.certificate.expiredAt.valueOf(),
      JSON.stringify({type: this.certificate.type, partner: this.certificate.partner}),
      this.certificate.fingerprint
    ).send();
    const tokenId = tx.events.Transfer.returnValues.tokenId;
    return hexify(tokenId);
  }
}
