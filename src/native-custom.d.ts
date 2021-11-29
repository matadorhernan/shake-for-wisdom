/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module '@nativescript/capacitor' {
  export interface customNativeAPI extends nativeCustom {}
}

/**
 * Define your own custom strongly typed native helpers here.
 */
export interface nativeCustom {
  nativeShake: (cb: (shakes: number) => void) => void;
  openNativeModalView: () => void;
}
