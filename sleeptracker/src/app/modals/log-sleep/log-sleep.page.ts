import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { IonDatetime } from '@ionic/angular';
import { SleepService } from 'src/app/services/sleep.service';
import { ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
})
export class LogSleepPage implements OnInit {
  comment:string;
  sleepStart:Date;
  sleepEnd:Date;
  quality:number;
  private lastlog:OvernightSleepData;

  constructor(public sleepService:SleepService, private modalController:ModalController, private toastController:ToastController) { }

  ngOnInit() {
    this.lastlog = null;
  }

  async closeModal()
  {
    await this.modalController.dismiss();
  }

  async createLog()
  {
    let formattedStart = format(parseISO(this.sleepStart.toString()),'MMMM d, yyyy HH:MM:SS');
    let formattedEnd = format(parseISO(this.sleepEnd.toString()),'MMMM d, yyyy HH:MM:SS');
    let newStart = new Date(formattedStart);
    let newEnd = new Date(formattedEnd);
    console.log(formattedStart);
    if(newStart < newEnd)
    {
      let loggedSleep = new OvernightSleepData(newStart,newEnd);
      let lastlog = loggedSleep;
      this.presentToast(750);
  
      console.log(loggedSleep);
      if(this.sleepStart != undefined && this.sleepEnd != undefined)
        this.sleepService.logOvernightData(loggedSleep);
      await this.modalController.dismiss();
    }
    else //error
    {
      this.presentToast2(750);
      await this.modalController.dismiss();
    }
   
    
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
  
  async presentToast2(time:number) {
    const toast = await this.toastController.create({
      message: 'Error: Invalid Dates',
      position: 'bottom',
      color: 'danger',
      duration: time
    });
    toast.present();
  }
}

