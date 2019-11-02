import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { JogadorDTO } from '../../models/jogador.dto';
import { SeusJogadoresService } from '../../services/domain/seus.jogadores.service';
import { StorageService } from '../../services/storage.service';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';
import { JogadorDetalheCadastrarPage } from '../jogador-detalhe-cadastrar/jogador-detalhe-cadastrar';
import { CONFIG_USU } from '../../config/config_usu';

@IonicPage()
@Component({
  selector: 'page-clube-empr-seus-jogadores',
  templateUrl: 'clube-empr-seus-jogadores.html',
})
export class ClubeEmprSeusJogadoresPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  reg: number;
  items: JogadorDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public seusJogadoresService: SeusJogadoresService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    this.seusJogadoresService.findSeusJogadores(localUser.email).subscribe(response => {
      this.items = response;
      this.loadImageUrls();
    },
    error => {});
  }

  loadImageUrls() {
    this.reg = 0;
    for (var i=0; i<this.items.length; i++) {
      this.reg = 1;
      let item = this.items[i];
      this.seusJogadoresService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${item.id}.jpg`;
        },
        error => {});
    }
  }

  verificaReg() : number {
    return this.reg;
  }

  chamaPaginaJogador() {
    this.navCtrl.push(SignupJogadorPage);
  }

  removeJogador() {
    console.log("AQX");
  }

  showDetail(idJogador: string, nomeJogador: string) {
    CONFIG_USU.idJogador = idJogador;
    CONFIG_USU.nomeJogador = nomeJogador;
    this.navCtrl.push(JogadorDetalheCadastrarPage);
  }

}
