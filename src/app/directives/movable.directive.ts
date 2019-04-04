import { Directive, ElementRef, HostListener, Input } from '@angular/core';

export interface Point {
  x: number;
  y: number;
}

@Directive({
  selector: 'svg[appMovable]',
  exportAs: 'appMovable',
})
export class MovableDirective {
  delta: Point = { x: 0, y: 0 };
  // tslint:disable-next-line:no-input-rename
  @Input('appMovable')
  origin: Point = { x: 0, y: 0 };
  from: Point = { x: 0, y: 0 };
  private dragging: boolean;

  constructor(private elementRef: ElementRef<SVGSVGElement>) {
  }

  get offsetX(): number {
    return this.origin.x + this.delta.x;
  }

  get offsetY(): number {
    return this.origin.y + this.delta.y;
  }

  get svg(): SVGSVGElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  mousedown($event: MouseEvent): void {
    this.svg.setPointerCapture(1);
    this.dragging = true;
    this.from.x = $event.offsetX;
    this.from.y = $event.offsetY;
  }

  @HostListener('mousemove', ['$event'])
  mousemove($event: MouseEvent): void {
    if (this.dragging) {
      const newPoint = screenToSvg(this.svg, { x: $event.offsetX, y: $event.offsetY });
      const origin = screenToSvg(this.svg, this.from);
      this.delta.x = newPoint.x - origin.x;
      this.delta.y = newPoint.y - origin.y;
    }
  }


  @HostListener('mouseup', ['$event'])
  mouseup(): void {
    this.svg.releasePointerCapture(1);
    this.dragging = false;
    this.origin.x += this.delta.x;
    this.origin.y += this.delta.y;
    this.delta.x = 0;
    this.delta.y = 0;
  }
}

function screenToSvg(svg: SVGSVGElement, point: Point): Point {
  const p = svg.createSVGPoint();
  p.x = point.x;
  p.y = point.y;
  return p.matrixTransform(svg.getScreenCTM().inverse());
}
