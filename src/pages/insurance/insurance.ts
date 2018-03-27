import { ChangeDetectorRef, Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { OnymosServices } from '../../services/onymos-services';

declare var OnymosAccess:any;
declare var OnymosDigiMe:any;

@Component({
	selector: 'page-insurance',
	templateUrl: 'insurance.html',
	providers: [OnymosServices]
})

export class Insurance {
	data : any = [];
	insuranceArray : any = [];
	errorMessage: string = '';
	test : string = 'init'
	insuranceReady : number = 0;
	quote : any = {};
	showQuote : number = 0;
	score : string = ''
	insuranceSelected : any ={}
	digiMeConnectObj = {
		serviceGroup: {
			financial: true,
			health: true,
			social: true
		}
	};

	fileNameArray: Array<any> = [];

	displayGetListSpec: boolean = false;
	getListQueryInProgress: boolean = false;
	getListQueryComplete: boolean = false;

	selectedServiceGroup: string = '';


	authDataObject: any;
	contacts: Array<any> = [];
	loadingContacts: boolean = false;

	constructor (	public navCtrl: NavController,
								private cdRef: ChangeDetectorRef) {
		this.data = ['blah', 'blah2'];
		this.test = 'asdfasdf'
		this.authDataObject = OnymosAccess.getAuth();
		this.insuranceReady = 0;
		this.showQuote =0;
		this.insuranceSelected = {}
		this.insuranceArray = [
		{name:'Aetna PPO 30', oldPrice:'260', newPrice:'180', savings:'80'},
		{name:'Aetna PPO 45', oldPrice:'500', newPrice:'300', savings:'200'},
		{name:'Aetna PPO 60', oldPrice:'630', newPrice:'540', savings:'90'},
		 ];
		this.score = 'A'
		this.quote = {}

		this.requestConsentAccess();

	} /* end constructor */

	requestConsentAccess () {
		this.digiMeConnectObj.serviceGroup = {
			financial: false,
			health: true,
			social: false
		};

		this.errorMessage = '';

		this.getListQueryInProgress = true;
		this.getListQueryComplete = false;
		this.fileNameArray = [];

		this.selectedServiceGroup = 'health';

		let that = this;

		OnymosDigiMe.getList(this.digiMeConnectObj,
			function getListSuccess (fileRecords) {

				fileRecords.forEach((file) => {
					// only get medical records
					if ( file.indexOf('18_2') > -1){
						this.getFileDetails(file)
						this.insuranceReady = 1;
					}
				})
			}.bind(this),
			function getListFailure (getListError) {
				console.log('ERROR : getList failed with error - ' + getListError);
				that.errorMessage = 'Failed retrieving Data List.';

				that.getListQueryInProgress = false;
				that.getListQueryComplete = true;

				that.cdRef.detectChanges();
			}.bind(this));

	} // end function requestConsentAccess

	getFileDetails (fileName) {

		let inputObject = {
			fileName: fileName
		};

		OnymosDigiMe.getDetails(inputObject,
			function getDetailSuccess (retrievedFileData) {
				if(retrievedFileData){

					JSON.parse(retrievedFileData).forEach(function(data){
						if (data.name && data.name.indexOf('abuse')){
							this.score = 'B'
						}
					}.bind(this))
				}
			}.bind(this),
			function getDetailFailure (getDetailError) {
				console.log("DEBUG : JS : [" + getDetailError + "]");
		});

	}	// end function getFileDetails

	getFileMetaData (fileName) {
		var yearMonthString = fileName.split('_')[5].replace('D', '');

		var year = yearMonthString.substring(0, 4);
		var month = yearMonthString.substring(4);

		switch (month) {
			case '01':
				return 'Jan. ' + year;

			case '02':
				return 'Feb. ' + year;

			case '03':
				return 'Mar. ' + year;

			case '04':
				return 'Apr. ' + year;

			case '05':
				return 'May ' + year;

			case '06':
				return 'Jun. ' + year;

			case '07':
				return 'Jul. ' + year;

			case '08':
				return 'Aug. ' + year;

			case '09':
				return 'Sep. ' + year;

			case '10':
				return 'Oct. ' + year;

			case '11':
				return 'Nov. ' + year;

			case '12':
				return 'Dec. ' + year;

		} // end switch month

	} // end function getFileMetaData
	showInsuranceQuote(insurance){
		console.log('in the showing of quotes')
		this.showQuote = 1;
		this.insuranceSelected = insurance;
	}
} /* end export class Invite */
