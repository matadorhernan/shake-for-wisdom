/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Smartphone } from 'angular-feather/icons';

const icons: Record<string, string> = {
  Smartphone,
};

@NgModule({
  declarations: [],
  imports: [FeatherModule.pick(icons), CommonModule],
  exports: [FeatherModule],
})
export class IconsModule {}
