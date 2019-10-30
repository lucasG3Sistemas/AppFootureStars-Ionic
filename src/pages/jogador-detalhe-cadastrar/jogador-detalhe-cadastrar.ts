import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CONFIG_USU } from '../../config/config_usu';
import { JogadorAdicionarLancePage } from '../jogador-adicionar-lance/jogador-adicionar-lance';

@IonicPage()
@Component({
  selector: 'page-jogador-detalhe-cadastrar',
  templateUrl: 'jogador-detalhe-cadastrar.html',
})
export class JogadorDetalheCadastrarPage {

  reg: number;
  nomeJogador: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nomeJogador = CONFIG_USU.nomeJogador;
  }

  ionViewDidLoad() {
    this.reg = 0;
  }

  chamaPaginaAdicionarLance() {
    this.navCtrl.push(JogadorAdicionarLancePage);
  }

  verificaReg(): number {
    return this.reg;
  }

}
