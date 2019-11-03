import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { JogadorDTO } from '../../models/jogador.dto';
import { JogadorService } from '../../services/domain/jogador.service';
import { StorageService } from '../../services/storage.service';
import { API_CONFIG } from '../../config/api.config';
import { CONFIG_USU } from '../../config/config_usu';
import { ListaObservacaoService } from '../../services/domain/lista.observacao.service';
import { ListaObservacaoDTO } from '../../models/lista.observacao.dto';
import { VisualizarDetalhesJogadorPage } from '../visualizar-detalhes-jogador/visualizar-detalhes-jogador';

@IonicPage()
@Component({
  selector: 'page-busca-jogadores',
  templateUrl: 'busca-jogadores.html',
})
export class BuscaJogadoresPage {

  reg: number;
  searchQuery: string = '';
  items: JogadorDTO[];
  listaObservacao: ListaObservacaoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public jogadorService: JogadorService,
    public listaObservacaoService: ListaObservacaoService,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    let localUser = this.storage.getLocalUser();
    this.jogadorService.findBuscaJogadores(CONFIG_USU.idListaObservacao, localUser.email).subscribe(response => {
      this.items = response;
      loader.dismiss();
      this.loadImageUrls();
    },
      error => {
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  getItems(ev: any) {
    let localUser = this.storage.getLocalUser();
    
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.jogadorService.findJogNome(CONFIG_USU.idListaObservacao, localUser.email, val).subscribe(response => {
        this.items = response;
        this.loadImageUrls();
      },
        error => { });

      
      //this.items = this.items.filter((item) => {
      //  return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //})
    } else {
      // Reset items back to all of the items
      this.loadData();
    }
  }

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
      this.jogadorService.getImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/jdor${item.id}.jpg`;
        },
          error => { });
    }
  }

  verificaReg(): number {
    return this.reg;
  }

  adicionarJogador(idJogador: string) {
    let localUser = this.storage.getLocalUser();
    this.listaObservacao = {
      id: CONFIG_USU.idListaObservacao,
      idJogador: idJogador,
      idUsuario: localUser.email
    };
    
    this.listaObservacaoService.insert(this.listaObservacao)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
    
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Jogador adicionado em sua lista com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }

  showDetail(idJogador: string, nomeJogador: string) {
    CONFIG_USU.idJogador = idJogador;
    CONFIG_USU.nomeJogador = nomeJogador;
    this.navCtrl.push(VisualizarDetalhesJogadorPage);
  }

}
