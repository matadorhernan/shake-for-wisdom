import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '@app/icons/icons.module';
import { AlertComponent } from './alert.component';



@NgModule({
  declarations: [AlertComponent],
  imports: [
    IconsModule,
    CommonModule
  ],
  exports: [AlertComponent]
})
export class AlertModule { }
