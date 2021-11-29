import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appTouchSwipes]',
})
export class TouchSwipesDirective {
  @Output() swipeRight: EventEmitter<void> = new EventEmitter();
  @Output() swipeLeft: EventEmitter<void> = new EventEmitter();
  private initialX?: number;
  private initialTime?: number;
  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent) {
    this.initialX = event.touches[0].pageX;
    this.initialTime = event.timeStamp;
  }
  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent) {
    if (
      ![this.initialX, this.initialTime].some((delta) => delta === undefined)
    ) {
      const { pageX } = event.touches[0] || event.changedTouches[0];
      const deltaX = this.initialX - pageX;
      const deltaTime = event.timeStamp - this.initialTime;
      if (deltaTime < 500 && Math.abs(deltaX) > 60) {
        if (deltaX > 0) {
          this.swipeRight.emit();
        } else {
          this.swipeLeft.emit();
        }
        this.initialX = undefined;
        this.initialTime = undefined;
      }
    }
  }
}
