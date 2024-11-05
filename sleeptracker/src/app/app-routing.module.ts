import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'log-sleep',
    loadChildren: () => import('./modals/log-sleep/log-sleep.module').then( m => m.LogSleepPageModule)
  },
  {
    path: 'day-sleepiness',
    loadChildren: () => import('./modals/day-sleepiness/day-sleepiness.module').then( m => m.DaySleepinessPageModule)
  },
  {
    path: 'sleeplog',
    loadChildren: () => import('./pages/sleeplog/sleeplog.module').then( m => m.SleeplogPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
