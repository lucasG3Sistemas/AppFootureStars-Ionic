import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupJogadorPage } from '../signup-jogador/signup-jogador';
import { UsuarioNewDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  usuario: UsuarioNewDTO = {
    email: "",
    senha: "",
    tipoUsuario: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser() {
    console.log("enviou o form");
    if (this.usuario.tipoUsuario == "1") {
      this.navCtrl.push(SignupJogadorPage);
    }
    
  }

}
