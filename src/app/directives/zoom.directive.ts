import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appZoom]',
  exportAs: 'appZoom',
})
export class ZoomDirective {

  scale = 1;

  constructor() {
  }

  @HostListener('mousewheel', ['$event'])
  mouseWheel($event: WheelEvent): void {
    if ($event.deltaY > 0) {
      this.scale *= 1.1;
    } else {
      this.scale *= 0.9;
    }
    $event.preventDefault();
  }
}
