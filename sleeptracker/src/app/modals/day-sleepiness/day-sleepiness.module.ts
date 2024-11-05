import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaySleepinessPageRoutingModule } from './day-sleepiness-routing.module';

import { DaySleepinessPage } from './day-sleepiness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaySleepinessPageRoutingModule
  ],
  declarations: [DaySleepinessPage]
})
export class DaySleepinessPageModule {}
