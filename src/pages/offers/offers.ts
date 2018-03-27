import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Insurance } from '../insurance/insurance'

@Component({
	selector: 'page-offers',
	templateUrl: 'offers.html'
})

export class Offers {
	items = []

	constructor (public navCtrl: NavController) {
	   this.items =[
	     'You can increase your retirement savings',
	     'You\'re eligible for 20% off your subscription',
	    ];
	}

	selected(){
		console.log('in the selected')
		this.navCtrl.push(Insurance)
	}

}
