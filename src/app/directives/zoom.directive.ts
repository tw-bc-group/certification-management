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
    const factor = $event.deltaY / 4;
    this.scale *= 1 - factor * 0.02;
    $event.preventDefault();
  }
}
