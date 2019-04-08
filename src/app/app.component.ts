import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as svgToDataUrl from 'svg-to-dataurl';
import { HttpClient } from '@angular/common/http';
import { blobToDataURL } from 'blob-util';

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
  photoUrl: string;
  pngUrl: string;
  username = '汪志成';

  constructor(private http: HttpClient) {
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
        this.photoUrl = url;
      });
    });
  }

  ngOnDestroy(): void {
  }

  saveAsPng(svg: SVGSVGElement): void {
    loadImage(svgToDataUrl(svg.outerHTML)).subscribe((img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      this.pngUrl = canvas.toDataURL('image/png');
    });
  }
}
