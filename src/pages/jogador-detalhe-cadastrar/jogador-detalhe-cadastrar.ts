import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { CONFIG_USU } from '../../config/config_usu';
import { JogadorAdicionarLancePage } from '../jogador-adicionar-lance/jogador-adicionar-lance';
import { JogadorLancesDTO } from '../../models/jogador.lance.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { JogadorLancesService } from '../../services/domain/jogador.lances.service';
import { StorageService } from '../../services/storage.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { JogadorDTO } from '../../models/jogador.dto';
import { API_CONFIG } from '../../config/api.config';
import { JogadorService } from '../../services/domain/jogador.service';

@IonicPage()
@Component({
  selector: 'page-jogador-detalhe-cadastrar',
  templateUrl: 'jogador-detalhe-cadastrar.html',
})
export class JogadorDetalheCadastrarPage {

  items: JogadorLancesDTO[];
  jogador: JogadorDTO;
  reg: number;
  nomeJogador: string;

  constructor(private dom: DomSanitizer, public plt: Platform,
    private youtube: YoutubeVideoPlayer, public navCtrl: NavController, public navParams: NavParams,
    public storage: StorageService, public jogadorService: JogadorService, public jogadorLancesService: JogadorLancesService,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.nomeJogador = CONFIG_USU.nomeJogador;

  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    this.jogadorService.findById(CONFIG_USU.idJogador)
      .subscribe(response => {
        this.jogador = response;
        loader.dismiss();
        this.getImageIfExists();
      },
        error => {
          loader.dismiss();
        });

    this.jogadorLancesService.findLancesJogador(CONFIG_USU.idJogador).subscribe(response => {
      this.items = response;
      if (response.length == 0) {
        this.reg = 0;
      } else {
        this.reg = 1;
      }
    },
      error => { this.reg = 0; });
  }

  getImageIfExists() {
    this.jogadorService.getImageFromBucket(this.jogador.id)
      .subscribe(response => {
        this.jogador.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${this.jogador.id}.jpg`;
      },
        error => { });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  chamaPaginaAdicionarLance() {
    this.navCtrl.push(JogadorAdicionarLancePage);
  }

  verificaReg(): number {
    return this.reg;
  }

  sanitize(urlVideo: string) {
    return this.dom.bypassSecurityTrustResourceUrl(urlVideo);
  }

  removerVideoJogador(id: string) {
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
            this.loadData();
          }
        }
      ]
    });
    alert.present();
  }

}
