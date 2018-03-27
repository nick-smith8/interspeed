import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';

import { NavController } from 'ionic-angular';

import { DigiMe } from '../digime/digime';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class Home {
  	@ViewChild(Nav) nav: Nav;

	items= [
		'Benefits'
	]

	constructor (public navCtrl: NavController) {
	   this.items =[
	     'Benefits'
	    ];
	}

	selected(){
		console.log('in the selected')

		this.nav.setRoot(DigiMe)
	}

}
