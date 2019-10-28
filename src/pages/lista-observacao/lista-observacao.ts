import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ListaObservacaoDTO } from '../../models/lista.observacao.dto';
import { ListaObservacaoService } from '../../services/domain/lista.observacao.service';
import { StorageService } from '../../services/storage.service';
import { BuscaJogadoresPage } from '../busca-jogadores/busca-jogadores';
import { CONFIG_USU } from '../../config/config_usu';

@IonicPage()
@Component({
  selector: 'page-lista-observacao',
  templateUrl: 'lista-observacao.html',
})
export class ListaObservacaoPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  reg: number;
  items: ListaObservacaoDTO[];
  listaObs: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public listaObservacaoService: ListaObservacaoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    this.listaObservacaoService.findListaObservacao(localUser.email).subscribe(response => {
      this.listaObs = response;
      CONFIG_USU.idListaObservacao = this.listaObs.id;
      this.items = response['jogadores']; 
      this.loadImageUrls();
    },
      error => { this.reg = 0; });
  }

  loadImageUrls() {
    this.reg = 0;
    for (var i = 0; i < this.items.length; i++) {
      this.reg = 1;
      let item = this.items[i];
      this.listaObservacaoService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${item.id}.jpg`;
        },
          error => { });
    }
  }

  verificaReg(): number {
    return this.reg;
  }

  enviarEmail(emailJogador : string) {
    let alert = this.alertCtrl.create({
      title: 'Enviar Email',
      message: "Escreva abaixo uma mensagem que deseja enviar para o jogador:",
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'mensagem',
          placeholder: 'Escreva aqui a mensagem'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            this.btnEnviarEmail(data, emailJogador);
            console.log('Saved clicked');
          }
        }
      ]
    });
    alert.present();

  }

  btnEnviarEmail(data : any, emailJogador : string) {
    let localUser = this.storage.getLocalUser();
    console.log(data);
    console.log(emailJogador);
    console.log(localUser.email);
  }

  chamaPaginaBuscaJogador() {
    this.navCtrl.push(BuscaJogadoresPage);
  }

}