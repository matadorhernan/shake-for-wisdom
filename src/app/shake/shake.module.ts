import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShakePageRoutingModule } from './shake-routing.module';
import { ShakePage } from './shake.page';
import { TouchSwipesModule } from '@app/shared/directives/touch-swipes/touch-swipes.module';
import { IconsModule } from '@app/icons/icons.module';
import { AlertModule } from '@app/shared/components/alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShakePageRoutingModule,
    TouchSwipesModule,
    IconsModule,
    AlertModule,
  ],
  declarations: [ShakePage],
})
export class ShakePageModule {}
