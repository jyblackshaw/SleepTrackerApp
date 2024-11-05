import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SleepService } from 'src/app/services/sleep.service';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { ToastController } from '@ionic/angular';
import { SleepData } from 'src/app/data/sleep-data';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-day-sleepiness',
  templateUrl: './day-sleepiness.page.html',
  styleUrls: ['./day-sleepiness.page.scss'],
})
export class DaySleepinessPage implements OnInit {

  date:Date;
  sleepiness:number;
  sleepinessArray:string[];

  constructor(public sleepService:SleepService, private modalController:ModalController, private toastController:ToastController) { }

  ngOnInit() {
    this.sleepinessArray = StanfordSleepinessData.ScaleValues;
  }

  async closeModal()
  {
    await this.modalController.dismiss();
  }

  async presentToast(time:number) {
    const toast = await this.toastController.create({
      message: 'Your entry has been saved',
      position: 'bottom',
      color: 'success',
      duration: time
    });
    toast.present();
  }

  async submitLog()
  {
    let formattedDate = format(parseISO(this.date.toString()),'MMMM d, yyyy HH:MM:SS');
    let newDate = new Date(formattedDate);
    
    let dayLog = new StanfordSleepinessData(this.sleepiness, newDate);
    this.presentToast(750); //show success
    console.log(dayLog);

    if(this.date != undefined && this.sleepiness != undefined)
      this.sleepService.logSleepinessData(dayLog);
    await this.modalController.dismiss();
  }

}
