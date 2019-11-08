import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Alert, AlertController } from 'ionic-angular';
import { DomSanitizer } from "@angular/platform-browser"
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { JogadorLancesService } from '../../services/domain/jogador.lances.service';
import { JogadorLancesDTO } from '../../models/jogador.lance.dto';
import { CONFIG_USU } from '../../config/config_usu';
import { JogadorAdicionarLancePage } from '../jogador-adicionar-lance/jogador-adicionar-lance';

@IonicPage()
@Component({
  selector: 'page-videos-jogador',
  templateUrl: 'videos-jogador.html',
})
export class VideosJogadorPage {

  reg: number;
  items: JogadorLancesDTO[];

  constructor(private dom: DomSanitizer, public plt: Platform,
    private youtube: YoutubeVideoPlayer, public navCtrl: NavController, public navParams: NavParams,
    public storage: StorageService, public jogadorLancesService: JogadorLancesService,
    public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.loadData();
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    this.jogadorLancesService.findLances(localUser.email).subscribe(response => {
      this.items = response;
      if (response.length == 0) {
        this.reg = 0;
      } else {
        this.reg = 1;
      }
    },
      error => { this.reg = 0; });
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  verificaReg(): number {
    return this.reg;
  }

  openMyVideo() {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo('rhQmy93LZH8');
    } else {
      window.open('https://www.youtube.com/watch?v=rhQmy93LZH8');
    }

  }

  sanitize(urlVideo: string) {
    return this.dom.bypassSecurityTrustResourceUrl(urlVideo);
  }

  chamaPaginaAdicionarLance() {
    this.navCtrl.push(JogadorAdicionarLancePage);
  }

  removerVideo(id: string) {
    this.jogadorLancesService.delete(id)
      .subscribe(response => {
        this.showDeleteOk();
      },
        error => { });
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Vídeo excluído com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.popToRoot();
            this.loadData();
          }
        }
      ]
    });
    alert.present();
  }

  editar(id: string) {
    CONFIG_USU.idLanceJogador = id;
    this.navCtrl.push(JogadorAdicionarLancePage);
  }

}
