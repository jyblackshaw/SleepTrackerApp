import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { StanfordSleepinessData } from 'src/app/data/stanford-sleepiness-data';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-sleeplog',
  templateUrl: './sleeplog.page.html',
  styleUrls: ['./sleeplog.page.scss'],
})
export class SleeplogPage implements OnInit {
  overnightSleeps:OvernightSleepData[];
  stanfordSleeps:StanfordSleepinessData[];
  overnight:boolean = false;
  sleepiness:boolean = false;
  overnightButtonLabel:string = 'Show Overnight Log';
  sleepinessButtonLabel:string = 'Show Sleepiness Log';

  constructor(private router:Router, private sleepService:SleepService) {
 
    //Now we have arrays with our data
   }

  ngOnInit() {
    this.overnightSleeps = SleepService.AllOvernightData;
    this.stanfordSleeps = SleepService.AllSleepinessData;
    
  }

  backpage() {
		this.router.navigate(['/home']);
	}

  showOvernight()
  {
    if(this.overnight)
      this.overnight = false;
    else
      this.overnight = true;

    if(this.overnight == false)
      this.overnightButtonLabel = 'Show Overnight Log';
    else
      this.overnightButtonLabel = 'Hide Overnight Log';
  }

  showSleepiness()
  {
    console.log(this.stanfordSleeps);
    if(this.sleepiness)
      this.sleepiness = false;
    else
      this.sleepiness = true;

    if(this.sleepiness == false)
      this.sleepinessButtonLabel = 'Show Sleepiness Log';
    else
      this.sleepinessButtonLabel = 'Hide Sleepiness Log';
  }
}
