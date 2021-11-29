import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { IconsModule } from '@app/icons/icons.module';
import { TouchSwipesModule } from '@app/shared/directives/touch-swipes/touch-swipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IconsModule,
    TouchSwipesModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
