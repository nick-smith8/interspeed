import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

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
	     'Insurance',
	     'Employee Credit Card',
	     'Commuter Benefits',
	     'Retirement'
	    ];
	}

	selected(){
		console.log('in the selected')
		this.navCtrl.push(Insurance)
		// this.nav.setRoot(DigiMe)
	}

}
