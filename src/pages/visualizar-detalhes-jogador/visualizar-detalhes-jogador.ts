import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-visualizar-detalhes-jogador',
  templateUrl: 'visualizar-detalhes-jogador.html',
})
export class VisualizarDetalhesJogadorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarDetalhesJogadorPage');
  }

}
