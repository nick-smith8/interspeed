import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Insurance } from '../insurance/insurance'

@Component({
	selector: 'page-alerts',
	templateUrl: 'alerts.html'
})

export class Alerts {
	items = []

	constructor (public navCtrl: NavController) {
	   this.items =[
	     'Sign up for Insurance',
	     'Upload Wearable Data for March Competition',
	    ];
	}

	selected(){
		console.log('in the selected')
		this.navCtrl.push(Insurance)
		// this.nav.setRoot(DigiMe)
	}

}
