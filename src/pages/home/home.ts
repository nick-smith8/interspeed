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
	items= [
		'Benefits'
	]

	constructor (public navCtrl: NavController) {
	   this.items =[
	     'Insurance',
	     'Pay',
	     'Employee Credit Card',
	     'Retirement',
	     'Social'
	    ];
	}

	selected(){
		console.log('in the selected')
		this.navCtrl.push(Insurance)
		// this.nav.setRoot(DigiMe)
	}

}
