import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as svgToDataUrl from 'svg-to-dataurl';
import { HttpClient } from '@angular/common/http';
import { blobToDataURL } from 'blob-util';
import { CertificateModel, CertificateType } from './models/certificate.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  certificate: CertificateModel = {
    photoUrl: '',
    firstName: '志成',
    lastName: '汪',
    expiredAt: new Date('2020-01-01T00:00:00Z'),
    publishedAt: new Date('2019-01-01T00:00:00Z'),
    fingerprint: '0x17ddasdf1',
    partnerLogoUrl: '',
    type: CertificateType.Community,
  };
  pngUrl: string;
  svgUrl: SafeResourceUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  photoChanged(files: FileList): void {
    this.pngUrl = '';
    const data = new FormData();
    data.set('image_file', files[0], files[0].name);
    data.set('size', 'auto');
    this.http.post('https://api.remove.bg/v1.0/removebg', data, {
      headers: {
        'X-Api-Key': '9FHqa9UnV4fYfPn7eVYEagvp',
      },
      responseType: 'blob',
    }).subscribe((blob) => {
      blobToDataURL(blob).then(url => {
        this.certificate.photoUrl = url;
      });
    });
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
