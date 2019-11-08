import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { JogadorDTO } from '../../models/jogador.dto';
import { SeusJogadoresService } from '../../services/domain/seus.jogadores.service';
import { StorageService } from '../../services/storage.service';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';
import { JogadorDetalheCadastrarPage } from '../jogador-detalhe-cadastrar/jogador-detalhe-cadastrar';
import { CONFIG_USU } from '../../config/config_usu';
import { JogadorService } from '../../services/domain/jogador.service';

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
    public seusJogadoresService: SeusJogadoresService,
    public actionsheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public jogadorService: JogadorService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();
    this.seusJogadoresService.findSeusJogadores(localUser.email).subscribe(response => {
      this.items = response;
      this.loadImageUrls();
    },
    error => {});
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
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

  removeJogador(idJogador: string) {
    this.jogadorService.delete(idJogador)
    .subscribe(response => {
      this.showDeleteOk();
    },
      error => { });
}

showDeleteOk() {
  let alert = this.alertCtrl.create({
    title: 'Sucesso!',
    message: 'Jogador excluído com sucesso',
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

  showDetail(idJogador: string, nomeJogador: string) {
    CONFIG_USU.idJogador = idJogador;
    CONFIG_USU.nomeJogador = nomeJogador;
    this.navCtrl.push(JogadorDetalheCadastrarPage);
  }

  openMenu(idJogador: string, email: string) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opções',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Editar',
          icon: 'ios-create',
          handler: () => {
            console.log('Edit clicked');
          }
        },
        {
          text: 'Excluir',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeJogador(idJogador);
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
