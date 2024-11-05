import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];
	public overnightFromStorage:SleepData[] = [];

	constructor(private overnightStorage:Storage, private sleepinessStorage:Storage) {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
		
		this.getOvernightStorage();
		console.log(SleepService.AllOvernightData);

		this.getSleepinessStorage();
		console.log(SleepService.AllSleepinessData);

	}
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		//console.log(SleepService.AllOvernightData);
		
		//Storage
		this.overnightStorage.set('overnight-key',JSON.stringify(SleepService.AllOvernightData));

	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);

		//Storage
		this.sleepinessStorage.set('sleepiness-key',JSON.stringify(SleepService.AllSleepinessData));
	}

	public getOvernightStorage()
	{	
		this.overnightStorage.get('overnight-key').then((val)=> {
			//Now need to create objects with each
			SleepService.AllOvernightData = []; //reset our array of data
			console.log(JSON.parse(val));
			let parsed = JSON.parse(val);
			
			for(var i = 0; i < parsed.length; i++)
			{
				let temp = new OvernightSleepData(new Date(parsed[i].sleepStart), new Date(parsed[i].sleepEnd));
				temp.setid(parsed[i].id);
				temp.setloggedAt(parsed[i].loggedAt);
				SleepService.AllOvernightData.push(temp);
			}

		})
	}
	

	public getSleepinessStorage()
	{
		this.sleepinessStorage.get('sleepiness-key').then((val)=> {
			//Now need to create objects with each
			SleepService.AllSleepinessData = []; //reset our array of data
			console.log(JSON.parse(val));
			let parsed = JSON.parse(val);
			
			for(var i = 0; i < parsed.length; i++)
			{
				let temp = new StanfordSleepinessData(parsed[i].loggedValue, new Date(parsed[i].loggedAt));
				temp.setid(parsed[i].id);
				SleepService.AllSleepinessData.push(temp);
			}

		})

	}
}
