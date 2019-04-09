import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as svgToDataUrl from 'svg-to-dataurl';
import { CertificateModel, CertificateType } from './models/certificate.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { addYears, startOfDay } from 'date-fns';

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

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnDestroy(): void {
  }

  saveAsPng(viewerSvg: SVGSVGElement): void {
    const svg = viewerSvg.cloneNode(true) as SVGSVGElement;
    svg.setAttribute('width', '600px');
    const svgUrl = svgToDataUrl(svg.outerHTML);
    this.svgUrl = this.sanitizer.bypassSecurityTrustResourceUrl(svgUrl);
    loadImage(svgUrl).subscribe((img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      this.pngUrl = canvas.toDataURL('image/png');
    });
  }
}
