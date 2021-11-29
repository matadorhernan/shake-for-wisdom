import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TouchSwipesDirective } from './touch-swipes.directive';

@NgModule({
  declarations: [TouchSwipesDirective],
  exports: [TouchSwipesDirective],
  imports: [CommonModule],
})
export class TouchSwipesModule {}
