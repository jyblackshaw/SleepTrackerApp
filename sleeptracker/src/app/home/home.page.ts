import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { ModalController } from '@ionic/angular';
import { LogSleepPage } from '../modals/log-sleep/log-sleep.page';
import { DaySleepinessPage } from '../modals/day-sleepiness/day-sleepiness.page';
import { SleeplogPage } from '../pages/sleeplog/sleeplog.page';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	time:Date;

	constructor(public sleepService:SleepService, private modalController:ModalController,private router:Router) {

	}

	ngOnInit() {
		console.log(this.allSleepData);

		//clock
		timer(0,1000).subscribe(()=>{
			this.time = new Date;
		})
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	async openModal()
	{
		const modal = await this.modalController.create({
			component: LogSleepPage
		});
		return await modal.present();
	}

	async openModal_sleepy()
	{
		const modal = await this.modalController.create({
			component: DaySleepinessPage
		});
		return await modal.present();
	}

	nextpage() {
		this.router.navigate(['/sleeplog']);
	}
}
