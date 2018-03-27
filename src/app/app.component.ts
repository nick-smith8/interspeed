import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Home } from '../pages/home/home';
import { Account } from '../pages/account/account';
import { DigiMe } from '../pages/digime/digime';
import { Login } from '../pages/login/login';

declare var OnymosAccess:any;
declare var OnymosChat:any;
declare var OnymosMedia:any;
declare var OnymosUtil:any;
declare var OnymosContacts:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Home;
  authenticated: boolean;
  DigiMe: any = DigiMe;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private cdRef: ChangeDetectorRef) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Benefits', component: Home, icon: 'heart' },
      { title: 'Alerts',  component: DigiMe, icon: 'alert' },
      { title: 'Offers', component: Account, icon: 'cash' },
      { title: 'Settings', component: Account, icon: 'construct' }
    ];

    this.authenticated = false;

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.events.subscribe('user:login', (time) => {
        this.authenticated = true;
        this.cdRef.detectChanges();
      });

      this.events.subscribe('user:logout', (time) => {
        this.authenticated = false;
        this.cdRef.detectChanges();

        console.log('app.component.ts : user:logout event Switching to Home page.');
        this.nav.setRoot(Home);
      });
      this.initializeOnymosComponents();
    });
  }

    initializeOnymosComponents() {

    let onymosConnectObj = {
      customerId : 'O1000002201', // Obtain from Onymos Team
      onymosAuthToken : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDk0ODc5OTksInYiOjAsImQiOnsidWlkIjoiTzEwMDAwMDIyMDEifSwiaWF0IjoxNDg4MzA2ODc4fQ.AJVEdv4vX_cJtr8Lw4JLXwlSrIJJaA1dCHZqoIGAKAY',  
      envType : 'PRD'
    };


    let that = this;
    let numberOfOnymosComponentsInitialized = 0;

    // Initialize Access Component
    OnymosAccess.initialize (
      onymosConnectObj,

      function onymosInitializeSuccess (status) {
        console.log('app.component.ts : OnymosAccess.initialize status - ' + status);
        numberOfOnymosComponentsInitialized++;

        initializeNonAccessComponents();

      },

      function onymosInitializeFailure (error) {
        console.log('app.component.ts : OnymosAccess.initialize error - ' + error);

      }); // end OnymosAccess.initialize
    // end Initialize Access Component

    function initializeNonAccessComponents() {
      // Initialize Chat Component
      OnymosChat.initialize (
        onymosConnectObj,

        function onymosInitializeSuccess (status) {
          console.log('app.component.ts : OnymosChat.initialize status - ' + status);
          numberOfOnymosComponentsInitialized++;

          if (numberOfOnymosComponentsInitialized === 5) {
            that.publishAuthenticationState();
            that.statusBar.styleDefault();
            that.splashScreen.hide();
          }

        },

        function onymosInitializeFailure (error) {
          console.log('app.component.ts : OnymosChat.initialize error - ' + error);

        }); // end OnymosChat.initialize
      // end Initialize Chat Component

      // Initialize Contacts Component
      OnymosContacts.initialize (
        onymosConnectObj,

        function onymosInitializeSuccess (status) {
          console.log('app.component.ts : OnymosContacts.initialize status - ' + status);
          numberOfOnymosComponentsInitialized++;

          if (numberOfOnymosComponentsInitialized === 5) {
            that.publishAuthenticationState();
            that.statusBar.styleDefault();
            that.splashScreen.hide();
          }

        },

        function onymosInitializeFailure (error) {
          console.log('app.component.ts : OnymosContacts.initialize error - ' + error);

        }); // end OnymosContacts.initialize
      // end Initialize Contacts Component

      // Initialize Media Component
      OnymosMedia.initialize (
        onymosConnectObj,

        function onymosInitializeSuccess (status) {
          console.log('app.component.ts : OnymosMedia.initialize status - ' + status);
          numberOfOnymosComponentsInitialized++;

          if (numberOfOnymosComponentsInitialized === 5) {
            that.publishAuthenticationState();
            that.statusBar.styleDefault();
            that.splashScreen.hide();
          }

        },

        function onymosInitializeFailure (error) {
          console.log('app.component.ts : OnymosMedia.initialize error - ' + error);

        }); // end OnymosMedia.initialize
      // end Initialize Media Component

      // Initialize Util Component
      OnymosUtil.initialize (
        onymosConnectObj,

        function onymosInitializeSuccess (status) {
          console.log('app.component.ts : OnymosUtil.initialize status - ' + status);
          numberOfOnymosComponentsInitialized++;

          if (numberOfOnymosComponentsInitialized === 5) {
            that.publishAuthenticationState();
            that.statusBar.styleDefault();
            that.splashScreen.hide();
          }

        },

        function onymosInitializeFailure (error) {
          console.log('app.component.ts : OnymosUtil.initialize error - ' + error);

        }); // end OnymosUtil.initialize
      // end Initialize Util Component
    } // end initializeNonAccessComponents

  } // end function initializeOnymosComponents

  navigateTo (page) {
    this.nav.setRoot(page.component)
    	.then(result => {
					if (!result){
						this.nav.setRoot(Login, {routeToPage: page.title});
					}
				})
      .catch(() => {

        // Page requires authentication, re-direct to Login page
        this.nav.setRoot(Login, {routeToPage: page.title});

      });

  } // end function navigateTo

  publishAuthenticationState() {
    if (OnymosAccess.getAuth()) {
      console.log('User logged in.');
      this.events.publish('user:login', Date.now());
    }
    else {
      console.log('User not logged in.');
      this.events.publish('user:logout', Date.now());
    }

  } // end function publishAuthenticatedEvent

  socialLogin() {
    this.nav.setRoot(Login);

  } // end function socialLogin

  socialLogout() {

    let that = this;

    OnymosAccess.logout(
      function logoutSuccess (statusMessage) {
        console.log('app.component.ts : onymosAccessLogout - Success');
        that.events.publish('user:logout', Date.now());
      },

      function logoutFailure (error) {
        console.log('app.component.ts : onymosAccessLogout error - ' + error);
      });

  } // end function socialLogout
}
