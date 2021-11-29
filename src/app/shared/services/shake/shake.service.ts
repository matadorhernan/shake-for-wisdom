import { Injectable, NgZone } from '@angular/core';
import { native } from '@nativescript/capacitor';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShakeService {
  public isShaking: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private readonly ngZone: NgZone) {
    native.nativeShake((shakes) => {
      this.ngZone.run(() => {
        this.isShaking.next(shakes);
      });
    });
  }
}
