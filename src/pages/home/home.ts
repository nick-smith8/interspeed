import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { NavController } from 'ionic-angular';

import { DigiMe } from '../digime/digime';

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
		this.navCtrl.push(DigiMe)
		// this.nav.setRoot(DigiMe)
	}

}
