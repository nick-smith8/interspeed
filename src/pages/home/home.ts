import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DigiMe } from '../digime/digime';

import { Insurance } from '../insurance/insurance'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class Home {
	items = []

	constructor (public navCtrl: NavController) {
	   this.items =[
	     {'name': 'Insurance', text: 'See recommendations for insurance plans and special premiums based on your health data' },
	     {'name': 'Employee Credit Card', component: DigiMe, text: 'Pick between Amex Gold and Amex Delta -- use digi.me data to determine which is better for you' },
	     {'name': 'Commuter Benefits', text: 'Sign up today to recieve before-tax treatment on all public transport' },
	     {'name': 'Retirement', text: 'See recommended options for what funds to invest your 401K into' }
	    ];
	}

	selected(){
		console.log('in the selected')
		this.navCtrl.push(Insurance)
		// this.nav.setRoot(DigiMe)
	}

}
