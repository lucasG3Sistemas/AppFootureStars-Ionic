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
import { VideosJogadorPage } from '../pages/videos-jogador/videos-jogador';
import { ClubesCadastradosPage } from '../pages/clubes-cadastrados/clubes-cadastrados';
import { ConfigJogadorPage } from '../pages/config-jogador/config-jogador';
import { TabsClubePage } from '../pages/tabsclube/tabsclube';
import { ListaObservacaoPage } from '../pages/lista-observacao/lista-observacao';
import { ClubeEmprSeusJogadoresPage } from '../pages/clube-empr-seus-jogadores/clube-empr-seus-jogadores';
import { ConfigClubePage } from '../pages/config-clube/config-clube';
import { ConfigEmprPage } from '../pages/config-empr/config-empr';
import { TabsEmprPage } from '../pages/tabsempr/tabsempr';

@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    VideosJogadorPage,
    ClubesCadastradosPage,
    ConfigJogadorPage,
    TabsPage,
    TabsClubePage,
    TabsEmprPage,
    ListaObservacaoPage,
    ClubeEmprSeusJogadoresPage,
    ConfigClubePage,
    ConfigEmprPage
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
    VideosJogadorPage,
    ClubesCadastradosPage,
    ConfigJogadorPage,
    TabsPage,
    TabsClubePage,
    TabsEmprPage,
    ListaObservacaoPage,
    ClubeEmprSeusJogadoresPage,
    ConfigClubePage,
    ConfigEmprPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider
  ]
})

export class AppModule {}
