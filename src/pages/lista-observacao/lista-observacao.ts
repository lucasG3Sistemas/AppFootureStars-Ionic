import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ListaObservacaoDTO } from '../../models/lista.observacao.dto';
import { ListaObservacaoService } from '../../services/domain/lista.observacao.service';
import { StorageService } from '../../services/storage.service';
import { BuscaJogadoresPage } from '../busca-jogadores/busca-jogadores';
import { CONFIG_USU } from '../../config/config_usu';
import { VisualizarDetalhesJogadorPage } from '../visualizar-detalhes-jogador/visualizar-detalhes-jogador';

@IonicPage()
@Component({
  selector: 'page-lista-observacao',
  templateUrl: 'lista-observacao.html',
})
export class ListaObservacaoPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  //searchQuery: string = '';
  reg: number;
  items: ListaObservacaoDTO[];
  listaObs: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public listaObservacaoService: ListaObservacaoService,
    public actionsheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    this.listaObservacaoService.findListaObservacao(localUser.email).subscribe(response => {
      this.listaObs = response;
      CONFIG_USU.idListaObservacao = this.listaObs.id;
      this.items = response['jogadores']; 
      this.loadImageUrls();
    },
      error => { this.reg = 0; });
  }

  //getItems(ev: any) {
  //  let localUser = this.storage.getLocalUser();

    // set val to the value of the searchbar
  //   const val = ev.target.value;

    // if the value is an empty string don't filter the items
  //  if (val && val.trim() != '') {

  //    this.listaObservacaoService.findListaObservacaoNome(localUser.email, val).subscribe(response => {
  //      this.listaObs = response;
  //      CONFIG_USU.idListaObservacao = this.listaObs.id;
  //      this.items = response['jogadores']; 
  //      this.loadImageUrls();
  //    },
  //      error => { });

      //this.items = this.items.filter((item) => {
      //  return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //})
    //} else {
      // Reset items back to all of the items
    //  this.loadData();
    //}
  //}

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
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

  showDetail(idJogador: string, nomeJogador: string) {
    CONFIG_USU.idJogador = idJogador;
    CONFIG_USU.nomeJogador = nomeJogador;
    this.navCtrl.push(VisualizarDetalhesJogadorPage);
  }

  openMenu(email: string) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opções',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Entrar em Contato',
          icon: 'md-chatbubbles',
          handler: () => {
            this.enviarEmail(email);
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}