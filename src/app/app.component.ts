import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

function loadImage(url: string): Observable<HTMLImageElement> {
  const result = new Subject<HTMLImageElement>();
  const image = document.createElement('img');
  image.src = url;
  image.addEventListener('load', () => {
    result.next(image);
  });
  return result.asObservable();

}

export function extractPerson(url: string): Observable<string> {
  return loadImage(url).pipe(
    map(image => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const graph = canvas.getContext('2d');
      graph.drawImage(image, 0, 0);
      const data = graph.getImageData(0, 0, canvas.width, canvas.height);
      let minX = 99999;
      let minY = 99999;
      let maxX = 0;
      let maxY = 0;
      for (let x = 0; x < data.width; ++x) {
        for (let y = 0; y < data.height; ++y) {
          const offset = (x + y * data.width) * 4;
          const color = data.data.slice(offset, offset + 4);
          if (color[0] === 255 && color[1] === 255 && color[2] === 255) {
            data.data[offset + 3] = 0;
          } else {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }
      setTimeout(() => {
        alert(`有图区域：${minX},${minY} ~ ${maxX},${maxY}；总尺寸：${canvas.width},${canvas.height}`);
      }, 100);
      graph.putImageData(data, 0, 0);

      return canvas.toDataURL();
    }),
  );
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  photo: string;

  photoChanged(files: FileList): void {
    this.revokeUrl();
    extractPerson(URL.createObjectURL(files.item(0))).subscribe(url => this.photo = url);
  }

  ngOnDestroy(): void {
    this.revokeUrl();
  }

  mousewheel($event: MouseEvent): void {
    console.log($event);
  }

  private revokeUrl() {
    if (this.photo) {
      URL.revokeObjectURL(this.photo);
    }
  }
}
