import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';
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
import { LoginPage } from '../pages/login/login';
import { ClubeFutebolService } from '../services/domain/clube.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { JogadorService } from '../services/domain/jogador.service';
import { EmpresarioService } from '../services/domain/empresario.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { SignupPage } from '../pages/signup/signup';
import { SignupJogadorPage } from '../pages/signup-jogador/signup-jogador';
import { SignupClubePage } from '../pages/signup-clube/signup-clube';
import { SignupEmpresarioPage } from '../pages/signup-empresario/signup-empresario';
import { CidadeService } from '../services/domain/municipio.service';
import { EstadoService } from '../services/domain/estado.service';
import { ModalidadeService } from '../services/domain/modalidade.service';
import { ModalidadePosicaoService } from '../services/domain/modalidade.posicao.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { HistoricoContratacaoService } from '../services/domain/historico.contratacao.service';
import { ListaObservacaoService } from '../services/domain/lista.observacao.service';
import { SeusJogadoresService } from '../services/domain/seus.jogadores.service';
import { BuscaJogadoresPage } from '../pages/busca-jogadores/busca-jogadores';
import { HttpModule } from '@angular/http';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    FeedPage,
    VideosJogadorPage,
    ClubesCadastradosPage,
    ConfigJogadorPage,
    TabsPage,
    TabsClubePage,
    TabsEmprPage,
    ListaObservacaoPage,
    BuscaJogadoresPage,
    ClubeEmprSeusJogadoresPage,
    ConfigClubePage,
    ConfigEmprPage,
    SignupPage,
    SignupJogadorPage,
    SignupClubePage,
    SignupEmpresarioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FeedPage,
    VideosJogadorPage,
    ClubesCadastradosPage,
    ConfigJogadorPage,
    TabsPage,
    TabsClubePage,
    TabsEmprPage,
    ListaObservacaoPage,
    BuscaJogadoresPage,
    ClubeEmprSeusJogadoresPage,
    ConfigClubePage,
    ConfigEmprPage,
    SignupPage,
    SignupJogadorPage,
    SignupClubePage,
    SignupEmpresarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    YoutubeVideoPlayer,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    ClubeFutebolService,
    JogadorService,
    EmpresarioService,
    EstadoService,
    CidadeService,
    ModalidadeService,
    ModalidadePosicaoService,
    HistoricoContratacaoService,
    ListaObservacaoService,
    SeusJogadoresService
  ]
})

export class AppModule { }
