import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPageModule } from '../pages/intro/intro.module';
import { ConfigProvider } from '../providers/config/config';
import { VideoPage } from '../pages/video/video';
import { ClubecadastradoPage } from '../pages/clubecadastrado/clubecadastrado';
import { ConfigjogadorPage } from '../pages/configjogador/configjogador';

@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    VideoPage,
    ClubecadastradoPage,
    ConfigjogadorPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    VideoPage,
    ClubecadastradoPage,
    ConfigjogadorPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider
  ]
})

export class AppModule {}
