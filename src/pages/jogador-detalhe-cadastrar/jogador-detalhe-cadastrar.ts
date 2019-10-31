import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
    public storage: StorageService, public jogadorService: JogadorService, public jogadorLancesService: JogadorLancesService) {

    this.nomeJogador = CONFIG_USU.nomeJogador;

  }

  ionViewDidLoad() {
    this.jogadorService.findById(CONFIG_USU.idJogador)
      .subscribe(response => {
        this.jogador = response;
        this.getImageIfExists();
      },
      error => {});

    this.jogadorLancesService.findLancesJogador(CONFIG_USU.idJogador).subscribe(response => {
      console.log(response);
      this.items = response;
      console.log(this.items);
      if (response.length == 0) {
        console.log("XXXX");
        this.reg = 0;
      } else {
        console.log("XXXzzzX");
        this.reg = 1;
      }
      console.log("aaaa");
    },
      error => { this.reg = 0; });
  }

  getImageIfExists() {
    this.jogadorService.getImageFromBucket(this.jogador.id)
    .subscribe(response => {
      this.jogador.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${this.jogador.id}.jpg`;
    },
    error => {});
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

}
