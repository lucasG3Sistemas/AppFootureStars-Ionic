import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorLancesDTO } from '../../models/jogador.lance.dto';
import { DomSanitizer } from '@angular/platform-browser';
import { JogadorService } from '../../services/domain/jogador.service';
import { StorageService } from '../../services/storage.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { JogadorLancesService } from '../../services/domain/jogador.lances.service';
import { CONFIG_USU } from '../../config/config_usu';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-visualizar-detalhes-jogador',
  templateUrl: 'visualizar-detalhes-jogador.html',
})
export class VisualizarDetalhesJogadorPage {

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
    error => {});
  }

  verificaReg(): number {
    return this.reg;
  }

  sanitize(urlVideo: string) {
    return this.dom.bypassSecurityTrustResourceUrl(urlVideo);
  }

}
