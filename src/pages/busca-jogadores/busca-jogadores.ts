import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-busca-jogadores',
  templateUrl: 'busca-jogadores.html',
})
export class BuscaJogadoresPage {

  reg: number;
  items: JogadorDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public jogadorService: JogadorService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubesCadastradosPage');
    this.jogadorService.findAll().subscribe(response => {
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
      this.jogadorService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${item.id}.jpg`;
        },
        error => {});
    }
  }

  verificaReg(): number {
    return this.reg;
  }

  adicionarJogador(idJogador: string) {
    
  }

}
