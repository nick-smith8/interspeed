
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { ChatDetails } from '../pages/chat-details/chat-details';
import { DigiMe } from '../pages/digime/digime';
import { DigiMeDetails } from '../pages/digime-details/digime-details';
// import { Invite } from '../pages/invite/invite';
// import { InviteDetails } from '../pages/invite-details/invite-details';
import { Account } from '../pages/account/account';
import { Login } from '../pages/login/login';
import { AutoResize } from '../directives/auto-resize/auto-resize';
import { ModalContentPage} from '../pages/chat-details/chat-details';

@NgModule({
  declarations: [
    MyApp,
    Home,
    // Chat,
    // ChatDetails,
    DigiMe,
    DigiMeDetails,
    ModalContentPage,
    // Invite,
    // InviteDetails,
    Account,
    Login,
    AutoResize
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    // Chat,
    // ChatDetails,
    DigiMe,
    DigiMeDetails,
    ModalContentPage,
    // Invite,
    // InviteDetails,
    Account,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
