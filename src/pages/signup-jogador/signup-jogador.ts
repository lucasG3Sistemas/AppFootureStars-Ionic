import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup-jogador',
  templateUrl: 'signup-jogador.html',
})
export class SignupJogadorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupJogadorPage');
  }

  signupJogador() {
    console.log("enviou o form");
  }

}
