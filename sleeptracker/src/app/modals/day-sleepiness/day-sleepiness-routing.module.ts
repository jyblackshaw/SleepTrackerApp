import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaySleepinessPage } from './day-sleepiness.page';

const routes: Routes = [
  {
    path: '',
    component: DaySleepinessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaySleepinessPageRoutingModule {}
