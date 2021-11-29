import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShakePage } from './shake.page';

const routes: Routes = [
  {
    path: '',
    component: ShakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShakePageRoutingModule {}
