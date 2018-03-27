import { ChangeDetectorRef, Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { OnymosServices } from '../../services/onymos-services';

import { Login } from '../login/login';
import { DigiMeDetails } from '../digime-details/digime-details';

declare var OnymosContacts:any;
declare var OnymosContactsConstants:any;

declare var OnymosAccess:any;
declare var OnymosDigiMe:any;

@Component({
	selector: 'page-insurance',
	templateUrl: 'insurance.html',
	providers: [OnymosServices]
})

export class Insurance {
	data : any = [];
	errorMessage: string = '';
	test : string = 'init'

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
				that.test = 'in success '

				fileRecords.forEach((file) => {
					console.log(this.getFileDetails(file))
				})
				console.log('END')

			}.bind(this),
			function getListFailure (getListError) {
				that.test = 'in failure '

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
		this.test = 'getfile'
		OnymosDigiMe.getDetails(inputObject,
			function getDetailSuccess (retrievedFileData) {
				this.test = 'in succes'
				console.log('DEBUG : getDetail Output : [' + retrievedFileData + ']');
				this.data.push(retrievedFileData)
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

} /* end export class Invite */
